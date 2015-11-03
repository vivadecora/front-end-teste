/* global define */
define(['../scope', 'marionette', 'underscore', './View'], function (scope, Marionette, _, View) {
    return scope.register('views.Pages', View.extend(
        {
            defaults: {
                controller: 'Pages',
                path: 'home'
            },
            initialize: function (options) {
                "use strict";
                this.options = _.defaults({}, options, _.result(this, 'defaults'));
            },
            template: function () {
                return this.options.controller + '/' + this.options.path
            }
        }
    ));
});