/* global define */
define([
    'scope',
    'application/app',
    'client',
    'application/routers/AppRouter'
], function (scope, app, client) {
    'use strict';
    app.addInitializer(function () {
        new client.libs.Basic(scope);
        scope.loader = new client.libs.Loader(scope);
        scope.history = new client.routers.History(scope);
    });
});
