module.directive('businessId', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModel) {
            ngModel.$validators.businessId = function (modelValue) {
                if (ngModel.$isEmpty(modelValue)) {
                    return true;
                }

                if (!modelValue || modelValue.match(/^\d{7}-\d$/g) === null) {
                    return false;
                }

                var checkSum = parseInt(modelValue[8], 10),
                    mod = ([7, 9, 10, 5, 8, 4, 2].map(function (i, index) {
                            return parseInt(modelValue[index], 10) * i;
                        }).reduce(function (a, b) {
                            return a + b;
                        })) % 11;

                switch (mod) {
                    case 0:
                        return checkSum === 0;

                    case 1:
                        return false;
                }

                return 11 - mod === checkSum;
            };
        }
    };
});
