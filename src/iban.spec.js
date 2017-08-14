define([
    'angular.mocks',
    'smartumValidators'
], function () {
    'use strict';

    describe('directive: IBAN', function () {
        var scope,
            element,
            correctValues = [
                'fi6910783000243344',
                'fi4547810010002894',
                'fi5412773000056547'
            ];

        beforeEach(function () {
            module('smartumValidators');

            inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                element = $compile('<input type="text" data-ng-model="iban" data-iban>')(scope);
            });
        });

        it('should handle invalid values correctly', function () {
            ['1234567-8', 'foobargirls'].forEach(function (iban) {
                element.val(iban).triggerHandler('input');

                expect(element.attr('class')).toContain('ng-invalid-iban');
            });
        });

        it('should validate correct values properly', function () {
            correctValues.forEach(function (iban) {
                element.val(iban).triggerHandler('input');

                expect(element.attr('class')).not.toContain('ng-invalid-iban');
            });
        });

        it('should always uppercase the value when typing', function () {
            correctValues.forEach(function (iban) {
                element.val(iban).triggerHandler('input');

                expect(scope.iban).toMatch(/^FI.*$/);
                expect(element.val()).toMatch(/^FI.*$/);
            });
        });
    });
});
