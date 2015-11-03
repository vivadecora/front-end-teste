/* global require */
require.config({
    deps: ['client/config'],
    callback: function () {
        'use strict';
        require(['application/main']);
    },
    packages: ['application/routers'],
    paths: {
        easing: 'vendors/jquery-easing-original/jquery.easing.min',
        validation: 'vendors/jquery-validation/dist/jquery.validate',
        greensock: 'vendors/gsap/src/uncompressed/'
    },
    shim: {
        easing: ['jquery'],
        validation: ['jquery'],
        'greensock/TweenLite': {
            deps: ['scope', 'greensock/plugins/CSSPlugin', 'greensock/easing/EasePack', 'greensock/plugins/ScrollToPlugin'],
            exports: 'TweenLite'
        },
        'greensock/TimelineLite': {
            deps: ['scope', 'greensock/TweenLite'],
            exports: 'TimelineLite'
        },
        'greensock/TweenMax': {
            deps: ['scope'],
            exports: 'TweenMax'
        },
        'greensock/TimelineMax': {
            deps: ['scope', 'greensock/TweenMax'],
            exports: 'TimelineMax'
        }
    }
});