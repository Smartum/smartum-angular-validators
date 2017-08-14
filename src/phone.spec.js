define([
    'angular.mocks',
    'smartumValidators'
], function () {
    'use strict';

    describe('directive: phone', function () {
        var scope, element;

        beforeEach(function () {
            module('smartumValidators');

            inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                element = $compile('<input type="text" data-ng-model="phone" data-phone>')(scope);
            });
        });

        it('should handle invalid value correctly', function () {
            ['000', '+35800A42', '00352'].forEach(function (phone) {
                element.val(phone).triggerHandler('input');

                expect(element.attr('class')).toContain('ng-invalid-phone');
            });
        });

        it('should validate correct values properly', function () {
            ['+358443787978', '+1800'].forEach(function (phone) {
                element.val(phone).triggerHandler('input');

                expect(element.attr('class')).not.toContain('ng-invalid-phone');
            });
        });
    });
});
