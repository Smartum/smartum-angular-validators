module.directive('ssn', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModel) {
            var upped = function (modelValue) {
                if (ngModel.$isEmpty(modelValue) || typeof modelValue !== 'string') {
                    return '';
                }

                var upped = modelValue.toUpperCase(), start = elem[0].selectionStart;

                if (upped !== modelValue) {
                    ngModel.$setViewValue(upped);
                    ngModel.$render();

                    elem[0].setSelectionRange(start, start);
                }

                return upped;
            };

            ngModel.$parsers.unshift(upped);

            ngModel.$validators.ssn = function (modelValue) {
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
