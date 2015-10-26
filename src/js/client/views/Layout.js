/* global define */
define(['../scope', 'marionette', 'underscore'], function (scope, Marionette, _) {
    return scope.register('views.Layout', Marionette.LayoutView.extend(
        {
            regions: {
                'content': '#content'
            }
        },
        {
            getTemplate: function () {
                var template = Marionette.getOption(this.prototype, 'template');
                if (_.isEmpty(template)) {
                    return 'layouts/default';
                } else {
                    return (_.isFunction(template)) ? template() : template;
                }
            }
        }
    ));
});