/* global define */
define([
    'scope',
    'application/app',
    'client',
    'jquery',
    'application/routers/AppRouter'
], function (scope, app, client, $) {
    'use strict';

    var Default = scope.register('layouts.Default', client.views.View.extend({
        template: 'layouts/default',
        regions: {
            'content': '#content'
        },
        behaviors: {},
        initialize: function(){},
        onShow: function () {}
    }));

    return Default;
});
