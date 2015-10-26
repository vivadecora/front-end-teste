/* global define */
define(['../scope', 'marionette', 'underscore', 'jquery'], function (scope, Marionette, _, $) {
    return scope.register('views.View', Marionette.LayoutView.extend(
        {
            serializeData: function () {
                return _.extend({}, this.value, Marionette.LayoutView.prototype.serializeData.apply(this));
            },
            setValue: function (value) {
                this.value = value;
            },
            setOptions: function (options) {
                _.extend(this.options, options);
            },
            getTemplate: function () {
                var template = Marionette.getOption(this, 'template');
                if (template === false) {
                    return false;
                } else if (!template) {
                    return 'Pages/home';
                } else {
                    return (_.isFunction(template)) ? template.apply(this) : template;
                }
            }
        },
        {
            regionAttach: function  (region, Klass, opt) {
                var html = $('<div>');
                opt = _.extend(opt || {}, {el: html, template: false});
                obj = new Klass(opt);
                html.append(region.$el.contents());
                return obj;
            },
            factory: function (args, actual) {
                if (this.type) {
                    var klass = this.type.split('::');
                    switch (klass[1]) {
                        case 'prototype':
                            return new this(args);
                            break;
                        case 'scope':
                            if (!actual || actual.constructor !== this) {
                                return new this(args);
                            } else {
                                return actual;
                            }
                            break;
                        case 'singleton':
                            if (!this.instance) {
                                this.instance = new this(args);
                            }
                            return this.instance;
                            break;
                    }
                } else {
                    return new this(args);
                }
            },
            getTemplate: function () {
                var template = Marionette.getOption(this.prototype, 'template');
                if (_.isEmpty(template)) {
                    return 'Pages/home';
                } else {
                    return (_.isFunction(template)) ? template() : template;
                }
            },
            getLayout: function () {
                var layout = Marionette.getOption(this.prototype, 'layout');
                if (_.isEmpty(layout)) {
                    return 'layouts/default';
                } else {
                    return (_.isFunction(layout)) ? layout() : layout;
                }
            }
        }
    ));
});
