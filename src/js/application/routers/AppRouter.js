/* global define */
define([
    'scope',
    'marionette',
    'application/views/Home'
], function (scope, Marionette, Home) {
    'use strict';
    var ApplicationController = Marionette.Controller.extend({
        home: function () {
            var url = '/';
            scope.app.execute('page:load', url, scope.views.Home);
        }
    });
    return scope.register('routers.AppRouter', Marionette.AppRouter.extend({
        controller: new ApplicationController(),
        appRoutes: {
            '(/)': 'home'
        }
    }));
});
