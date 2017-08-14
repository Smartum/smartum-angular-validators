/**
 * smartum-angular-validators v0.6.0
 */

(function(root, factory) {
    'use strict';

    if (typeof define === 'function' && define.amd) {
        define(['angular', 'moment'], factory);
    } else {
        factory(root.angular, root.moment);
    }
}(this, function(angular, moment) {
    'use strict';

    var module = angular.module('smartumValidators', []);

    module.directive('businessId', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                ngModel.$validators.businessId = function(modelValue) {
                    if (ngModel.$isEmpty(modelValue)) {
                        return true;
                    }

                    if (!modelValue || modelValue.match(/^\d{7}-\d$/g) === null) {
                        return false;
                    }

                    var checkSum = parseInt(modelValue[8], 10),
                        mod = ([7, 9, 10, 5, 8, 4, 2].map(function(i, index) {
                            return parseInt(modelValue[index], 10) * i;
                        }).reduce(function(a, b) {
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

    module.directive('ssn', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                var upped = function(modelValue) {
                    if (ngModel.$isEmpty(modelValue) || typeof modelValue !== 'string') {
                        return '';
                    }

                    var upped = modelValue.toUpperCase(),
                        start = elem[0].selectionStart;

                    if (upped !== modelValue) {
                        ngModel.$setViewValue(upped);
                        ngModel.$render();

                        elem[0].setSelectionRange(start, start);
                    }

                    return upped;
                };

                ngModel.$parsers.unshift(upped);

                ngModel.$validators.ssn = function(modelValue) {
                    if (ngModel.$isEmpty(modelValue)) {
                        return true;
                    }

                    var res = modelValue.toUpperCase().match(
                        /^(\d{2})(\d{2})(\d{2})[-+a](\d{3})([abcdefhjklmnprstuvwxy0-9])$/i
                    );

                    if ((res === null) || !moment(res[1] + '-' + res[2] + '-' + res[3], 'DD-MM-YY').isValid()) {
                        return false;
                    }

                    var lookup = {
                        10: 'A',
                        11: 'B',
                        12: 'C',
                        13: 'D',
                        14: 'E',
                        15: 'F',
                        16: 'H',
                        17: 'J',
                        18: 'K',
                        19: 'L',
                        20: 'M',
                        21: 'N',
                        22: 'P',
                        23: 'R',
                        24: 'S',
                        25: 'T',
                        26: 'U',
                        27: 'V',
                        28: 'W',
                        29: 'X',
                        30: 'Y'
                    };

                    var m = parseInt('' + res[1] + res[2] + res[3] + res[4], 10) % 31;

                    if (m < 10) {
                        return m === parseInt(res[5], 10);
                    }

                    return lookup.hasOwnProperty(m.toString()) && lookup[m] === res[5];
                };

                upped(scope[attrs.ngModel]);
            }
        };
    });

    module.directive('iban', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elem, attrs, ngModel) {
                var upped = function(modelValue) {
                    if (ngModel.$isEmpty(modelValue) || typeof modelValue !== 'string') {
                        return '';
                    }

                    var upped = modelValue.toUpperCase(),
                        start = elem[0].selectionStart;

                    if (upped !== modelValue) {
                        ngModel.$setViewValue(upped);
                        ngModel.$render();

                        elem[0].setSelectionRange(start, start);
                    }

                    return upped;
                };

                ngModel.$parsers.unshift(upped);

                ngModel.$validators.iban = function(modelValue) {
                    if (ngModel.$isEmpty(modelValue)) {
                        return true;
                    }

                    var A = 'A'.charCodeAt(0),
                        Z = 'Z'.charCodeAt(0),
                        iban = modelValue.toUpperCase().replace(/\s/g, '');

                    iban = iban.substr(4) + iban.substr(0, 4);

                    var remainder = iban.split('').map(function(n) {
                        var code;
                        code = n.charCodeAt(0);
                        if (code >= A && code <= Z) {
                            return code - A + 10;
                        } else {
                            return n;
                        }
                    }).join('');

                    while (remainder.length > 2) {
                        var block = remainder.slice(0, 9);

                        remainder = parseInt(block, 10) % 97 + remainder.slice(block.length);
                    }

                    return parseInt(remainder, 10) % 97 === 1;
                };

                upped(scope[attrs.ngModel]);
            }
        };
    });

    module.directive('phone', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            link: function(scope, elm, attrs, ngModel) {
                ngModel.$validators.phone = function(modelValue) {
                    if (ngModel.$isEmpty(modelValue)) {
                        return true;
                    }

                    return modelValue.match(/\+(9[976]\d|8[987530]\d|6[987]\d|5[90]\d|42\d|3[875]\d|2[98654321]\d|9[8543210]|8[6421]|6[6543210]|5[87654321]|4[987654310]|3[9643210]|2[70]|7|1)\d{1,14}$/g) !== null;
                };
            }
        };
    });

}));
