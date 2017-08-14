require.config({
    paths: {
        jquery: '../bower_components/jquery/dist/jquery.min',
        moment: '../bower_components/moment/min/moment.min',
        angular: '../bower_components/angular/angular.min',
        'angular.messages': '../bower_components/angular-messages/angular-messages.min',
        smartumValidators: '../dist/smartum-angular-validators'
    },

    shim: {
        angular: {
            deps: ['jquery'],
            exports: 'angular'
        },
        'angular.messages': ['angular']
    }
});

window.name = 'NG_DEFER_BOOTSTRAP!';

require([
    'angular',
    'angular.messages',
    'smartumValidators'
], function (angular) {
    'use strict';

    var app = angular.module('app', ['smartumValidators', 'ngMessages']);

    angular.element().ready(function () {
        angular.resumeBootstrap([app['name']]);
    });
});
