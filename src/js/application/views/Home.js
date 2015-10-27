/* global define */
define([
    'scope',
    'client',
    'underscore',
    'validation'
], function (scope, client, _) {
    'use strict';

    var Home = scope.register(
        'views.Home',
        client.views.View.extend({
            template: 'templates/home',
            behaviors: {},
            ui: {
                'form': '.ui-form'
            },
            events: {
                'click .e-interest': 'showForm'
            },
            showForm: function (e) {
                var me=this,
                    $el = $(e.target);

                $el.slideUp('fast',function (){
                    me.ui.form.slideDown('fast');
                })
            },
            formValidation:function(){
                var me=this;
                
                this.ui.form.validate({
                    ignore: '',
                    messages: {
                        'name': {
                            required: ''
                        },
                        'email':{
                            required: '',
                            email:''
                        },
                        'company': {
                            required: ''
                        }
                    },
                    errorClass: "input-error",
                    validClass: "valid",
                    highlight: function(element, errorClass) {
                        me.ui.form.find(element).addClass(errorClass);
                    },
                    unhighlight: function(element, errorClass) {
                        me.ui.form.find(element).removeClass(errorClass);
                    },
                    invalidHandler: function() {
                        me.ui.form.find('.error-message').fadeIn('fast');
                    },
                    submitHandler: function() {
                        me.ui.form.fadeOut('fast').find('.error-message').fadeOut('fast');
                        me.$el.find('.message-success').fadeIn('fast');
                    }
                });

            },
            onShow: function(){
                
                this.formValidation();
            },
        })
    );

    return Home;
});
