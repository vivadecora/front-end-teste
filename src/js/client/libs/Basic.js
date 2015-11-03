/* global define */
define(['../scope', 'underscore'], function (scope, _) {
    return scope.register('libs.Basic', function (s) {
        s.app.commands.setHandler('page:title', function (t) {
            document.title = t;
        });
        s.app.commands.setHandler('page:config', function (c) {
            _.merge(s.config, c);
            s.app.trigger('config:change', c);
        });
        s.app.commands.setHandler('page:error', function (c) {
            s.history.navigate('/error', true);
        });
        s.app.reqres.setHandler('page:layout', function(layout){
            return _.find(s.layouts, function (a) { 
                return a.getTemplate() == layout
            });
        });
    });
});