/* global require */
require.config({
    paths: {
        requirejs: 'vendors/requirejs/require',
        jquery: 'vendors/jquery/dist/jquery',
        underscore: 'vendors/lodash/dist/lodash',
        backbone: 'vendors/backbone/backbone',
        mustache: 'vendors/mustache/mustache',
        marionette: 'vendors/marionette/lib/core/backbone.marionette',
        'backbone.wreqr': 'vendors/backbone.wreqr/lib/backbone.wreqr',
        'backbone.babysitter': 'vendors/backbone.babysitter/lib/backbone.babysitter',
        client: 'client',
        underscoredeep: 'vendors/underscore-deep/underscore.deep',
        URIjs: 'vendors/uri.js/src'

    },
    packages: ['client'],
    shim: {
        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        underscoredeep: {
            deps: ['underscore'],
            exports: '_'
        },
        underscore: {
            exports: '_'
        },
        mustache: {
            exports: 'Mustache'
        }
    }
});