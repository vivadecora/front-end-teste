/* global define */
define([
    'scope',
    'client',
    'underscore'
], function (scope, client, _) {
    'use strict';

    var Home = scope.register(
        'views.Home',
        client.views.View.extend({
            template: 'pages/home',
            behaviors: {},
            ui: {},
            events: {},
            onShow: function(){}
        })
    );

    return Home;
});
