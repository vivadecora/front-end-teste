/* global define */
define(['../scope', 'underscore'], function (scope, _) {
    return scope.register('libs.Loading', function (s, loading) {
        var stack = [];
        if (loading) {
            s.app.on('loading:show', function () {
                loading.show();
            });
            s.app.on('loading:hide', function () {
                loading.hide();
            });
        }
        s.app.commands.setHandler('loading:begin', function (t) {
            if (!stack.length) {
                s.app.trigger('loading:show');
            }
            stack.push(true);
        });
        s.app.commands.setHandler('loading:end', function (c) {
            stack.pop(); 
            if (!stack.length) {
                s.app.trigger('loading:hide');
            }
        });
        
    });
});