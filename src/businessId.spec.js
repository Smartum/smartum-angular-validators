define([
    'angular.mocks',
    'smartumValidators'
], function () {
    'use strict';

    describe('directive: businessId', function () {
        var scope, element;

        beforeEach(function () {
            module('smartumValidators');

            inject(function ($rootScope, $compile) {
                scope = $rootScope.$new();
                element = $compile('<input type="text" data-ng-model="businessId" data-business-id>')(scope);
            });
        });

        it('should handle invalid values correctly', function () {
            ['1234567-8', 'foobargirls'].forEach(function (businessId) {
                element.val(businessId).triggerHandler('input');

                expect(element.attr('class')).toContain('ng-invalid-business-id');
            });
        });

        it('should validate correct values properly', function () {
            ['2169642-2', '2341411-8', '0142126-1', '0480737-0'].forEach(function (businessId) {
                element.val(businessId).triggerHandler('input');

                expect(element.attr('class')).not.toContain('ng-invalid-business-id');
            });
        });
    });
});
