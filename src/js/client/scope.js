/* global define */
define(['underscoredeep'], function () {
    'use strict';
    var scope = window.CLIENT = window.CLIENT || {};
    scope.register = function (key, value) {
        _.deep(scope, key, value);
        return value;
    };
    return scope;
});