/* global define */
define(['../scope', 'backbone', 'jquery', 'underscore', 'marionette'], function (scope, Backbone, $, _, Marionette) {
    var H = scope.register('routers.History', Marionette.Object.extend({
        initialize: function(s, opts) {
            this.scope = s;
            var script = this.scope.config.urls.script || '';
            this.options = _.merge({
                pushState: !s.config.asset, 
                root: s.config.urls.base + script
            }, opts || {});
            this.buildRouters();
            this.bind();
            this.redirect();
            this.history();
            var histories = this.histories = [Backbone.history.fragment];
            Backbone.history.on('route', function(page) {
                histories.push(Backbone.history.fragment);
            });
        },
        history: function () {
            Backbone.history.start(this.options);
        },
        navigate: function (href, replace) {
            if (this.scope.config.urls.base !== '/' && href.indexOf(this.scope.config.urls.base) === 0) {
                href = href.substring(this.scope.config.urls.base.length);
            }
            if (Backbone.history.navigate(href, {trigger: true, replace: !!replace}) === false) {
                this.scope.app.execute('page:error');
            }
        },
        bind: function () {
            var me = this;
            $(document).on('click.router', 'a:not([data-bypass])', function(evt) {
                var href = $(this).attr('href');
                href.replace(me.scope.config.urls.site, '/');
                if (me.checkUrl(href)) {
                    evt.preventDefault();
                    me.navigate(href);
                }
            });
        },
        checkUrl: function (href) {
            return href
                && href.indexOf('#') === -1  
                && href.indexOf('://') === -1 
                && href.indexOf('mailto:') !== 0 
                && href.indexOf('javascript:') !== 0
        },
        unbind: function () {
            $(document).off('click.router');
        },
        buildRouters: function () {
            if (!_.isEmpty(this.scope.routers)) {
                for (var router in this.scope.routers) {
                    new this.scope.routers[router];
                    delete this.scope.routers[router];
                }
            }
        },
        redirect: function () {
            this.scope.app.commands.setHandler('page:redirect', function(redirect) {
                this.scope.app.execute('loader:fired');
                this.navigate(redirect, true);
            }, this);
        }
    }));
    return H;
});