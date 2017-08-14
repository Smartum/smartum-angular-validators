define([
    'angular.mocks',
    'smartumValidators'
], function () {
    'use strict';

    describe('directive: SSN', function () {
        var scope,
            element,
            correctValues = [
            '150382-111u',
            '250383-152v',
            '261006A728v',
            '151287-1078'
        ];

        beforeEach(function () {
            module('smartumValidators');

            inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                element = $compile('<input type="text" data-ng-model="ssn" data-ssn>')(scope);
            });
        });

        it('should handle invalid values correctly', function () {
            ['000000-0000', 'foobarboys', '150382-111A'].forEach(function (ssn) {
                element.val(ssn).triggerHandler('input');

                expect(element.attr('class')).toContain('ng-invalid-ssn');
            });
        });

        it('should validate correct values properly', function () {
            correctValues.forEach(function (ssn) {
                element.val(ssn).triggerHandler('input');

                expect(element.attr('class')).not.toContain('ng-invalid-ssn');
            });
        });

        it('should always uppercase the value when typing', function () {
            correctValues.forEach(function (ssn) {
                element.val(ssn).triggerHandler('input');

                expect(scope.ssn).toMatch(/^.*[ABCDEFHJKLMNPRSTUVWXY0-9]$/);
                expect(element.val()).toMatch(/^.*[ABCDEFHJKLMNPRSTUVWXY0-9]$/);
            });
        });
    });
});
