/* global define */
define([
    '../scope',
    'jquery',
    'underscore',
    'URIjs/URI',
    'marionette',
    '../views/Renderer',
    '../views/Layout'
], function (scope, $, _, URI, Marionette, Renderer, BasicLayout) {

    var Loader = scope.register('libs.Loader', function (s, settings) {
        this.renderer = new Renderer(s);
        this.scope = s;
        this.settings = _.merge(
            {
                assets: s.config.get_assets,
                data: !s.config.no_data,
                fired: !Modernizr.history || s.config.get_assets
            },
            settings || {}
        );
        s.app.commands.setHandler('page:load', this.load, this);
        s.app.commands.setHandler('page:ajax', this.ajax, this);
        s.app.commands.setHandler('page:fetch', this.fetch, this);
        s.app.commands.setHandler('loader:fired', this.setFired, this);
    });
    _.extend(Loader.prototype, {
        setFired: function () {
            this.settings.fired = true;
        },
        actions: function (value) {
            value = value || {};
            if (!_.isEmpty(value.config) && !_.isEmpty(value.config.title)) {
                this.scope.app.execute('page:title', value.config.title);
            }
            if (!_.isEmpty(value.templates)) {
                this.renderer.addTemplates(value.templates);
            }
            if (!_.isEmpty(value.config)) {
                this.scope.app.execute('page:config', value.config);
            }
            if (value && value.redirect && value.redirect != null) {
                me.scope.app.execute('page:redirect', value.redirect);
                return false;
            }
            return true;
        },
        ajax: function (url, View, options, callback) {
            this.fetch(false, url, View, options, callback);
        },
        load: function (url, View, options, callback) {
            this.fetch(true, url, View, options, callback);
        },
        fetch: function (attach, url, View, options, callback) {
            var me = this, xhrs = [], done = $.Deferred(), success = this.createSucces(done, attach, View, options, callback);
            me.scope.app.execute('loading:begin');
            if (this.settings.assets) {
                xhrs = xhrs.concat(this.getAssets(View));
            }
            if (this.settings.data && this.settings.fired) {
                xhrs = xhrs.concat(this.getData(url, View, success));
            } else {
                done.then(success);
            }
            $.when.apply($, xhrs).then(function () {
                me.scope.app.execute('loading:end');
                done.resolve();
            }).fail(_.bind(this.error, this));
        },
        createSucces: function (done, attach, View, options, callback) {
            var me = this;
            return function success(value) {
                done.then(function () {
                    if (me.actions(value)) {
                        var content = me.layout(View).content, obj;
                        if (attach && !me.settings.fired) {
                            obj = scope.views.View.regionAttach(content, View, options);
                            me.setFired()
                        } else {
                            obj = me.factory(View, options, content.currentView);
                        }
                        $.isFunction(obj.setValue) && obj.setValue(value);
                        attach && content.show(obj);
                        $.isFunction(callback) && callback(obj);
                    }
                });
            };
        },
        getData: function (url, View, success) {
            return $.ajax({
                url: this.url(url, View),
                success: success,
                error: _.bind(this.error, this),
                dataType: 'json'
            });
        },
        getAssets: function (View) {
            var xhrs = [], list = [View, this.getLayout(View)];
            for (var i in list) {
                var Klass = list[i], templates = [];
                if (!Klass) continue;
                templates.push(Klass.getTemplate());
                if (_.isFunction(Klass.getPartials)) {
                    templates = templates.concat(Klass.getPartials());
                }
                this.doXHR('template', {templates: templates}, xhrs);
                if (_.isFunction(Klass.getAssets)) {
                    this.doXHR('assets', Klass.getAssets());
                }
            }

            return xhrs;
        },
        doXHR: function (type, options, xhrs) {
            switch(type) {
                case 'template':
                var renderer = this.renderer;
                for (var i in options.templates) {
                    var tpl = options.templates[i];
                    if (!renderer.isCached(tpl)) {
                        xhrs.push($.get(this.scope.config.urls.base + this.scope.config.asset + '-templates/' + tpl + '.html').done(function (result) {
                            var templates = {};
                            templates[tpl] = result;
                            renderer.addTemplates(templates);
                        }));
                    }
                }
                break;
                case 'assets':
                for (var i in options.assets) {
                    var asset = options.assets[i];
                    if (_.isUndefined(this.assetsCache[asset])) {
                        this.assetsCache[asset] = true;
                        xhrs.push($.get(this.scope.config.urls.base + asset));
                    }
                }
                break;
            }
        },
        error: function () {
            this.scope.app.execute('page:error');
        },
        factory: function (View, options, actual){
            var arg = _.extend({}, options),
                obj = (_.isFunction(View.factory)) ? View.factory(arg, actual) : new View(arg);
            return obj;
        },
        layout: function (View) {
            var region = this.getRegion(), Layout = this.getLayout(View);
            if (!region.currentView || region.currentView.__layout__ !== Layout.getTemplate()) {
                var obj = (this.settings.fired) ? new Layout() : scope.views.View.regionAttach(region, Layout);
                obj.__layout__ = View.getLayout();
                region.show(obj);
            }
            return region.currentView;
        },
        getRegion: function () {
            return this.scope.app.getRegion('main');
        },
        getLayout: function (View) {
            var Layout;
            try {
                Layout = this.scope.app.request('page:layout', View.getLayout());
            } catch (e) {
            }
            return Layout || BasicLayout.extend({template: View.getLayout()});
        },
        url: function (base, View) {
            var url = new URI(this.scope.config.urls.base + base);
            if (!this.settings.assets) {

                if (!this.renderer.hasTemplate(View)) {
                    url.addQuery('templates', 1);
                }
                if (!this.renderer.hasTemplate(this.getLayout(View))) {
                    url.addQuery('layout', 1);
                }
            }
            return url.toString();
        }
    });
    return Loader;
});
