/* global define */
define([
    'scope',
    'marionette'
], function (scope, Marionette, $) {
    'use strict';

    var app = scope.app = new Marionette.Application();
    app.addRegions({
        main: '#main'
    });



    return app;
});
