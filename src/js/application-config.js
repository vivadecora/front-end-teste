/* global require */
require.config({
    deps: ['client/config'],
    callback: function () {
        'use strict';
        require(['application/main']);
    },
    packages: ['application/routers'],
    paths: {
        'validation': 'vendors/jquery-validation/dist/jquery.validate'
    },
    shim: {
        'validation': ['jquery']
    }
});