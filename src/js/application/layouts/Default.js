/* global define */
define([
    'scope',
    'application/app',
    'client',
    'jquery',
    'application/routers/AppRouter',
    'easing',
    'greensock/TimelineMax',
    'greensock/plugins/CSSPlugin'
], function (scope, app, client, $) {
    'use strict';

    var Default = scope.register('layouts.Default', client.views.View.extend({
        template: 'layouts/default',
        regions: {
            'content': '#content'
        },
        behaviors: {},
        initialize: function(){},
        onShow: function () {
            var me=this;

            $(window).scroll(function(){
                var topbar = me.$el.find('.topbar'),
                scroll = $(window).scrollTop();

                if (scroll >= 80) topbar.addClass('fixed');
                else topbar.removeClass('fixed');
            });
        }
    }));

    return Default;
});
