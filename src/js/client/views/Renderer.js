/* global define */
define(['../scope', 'underscore', 'mustache', 'marionette'], function (scope, _, Mustache, Marionette) {
    'use strict';
    var Renderer = scope.register('views.Renderer', function (s) {
        this.cache = {};
        this.scope = s;
        var me = this;
        Marionette.Renderer.render = function (template, data) {
            return me.render(template, data);
        }
    });
    _.extend(Renderer.prototype, {
        hasTemplate: function (View) {
            if (_.isFunction(View.getTemplate)) {
                return this.isCached(View.getTemplate());
            }
            return true;
        },
        render: function (template, data) {
            return Mustache.render(this.cache[template], _.extend({}, {config: this.scope.config}, data), this.cache)
        },
        addTemplates: function (templates) {
            _.extend(this.cache, templates);
        },
        isCached: function (tpl) {
            return !_.isUndefined(this.cache[tpl]);
        }
    });
    return Renderer;
});