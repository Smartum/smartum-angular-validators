module.directive('iban', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function (scope, elem, attrs, ngModel) {
            var upped = function (modelValue) {
                if (ngModel.$isEmpty(modelValue) || typeof modelValue !== 'string') {
                    return '';
                }

                var upped = modelValue.toUpperCase().replace(/\s/gi, ''), start = elem[0].selectionStart;

                if (upped !== modelValue) {
                    ngModel.$setViewValue(upped);
                    ngModel.$render();

                    elem[0].setSelectionRange(start, start);
                }

                return upped;
            };

            ngModel.$parsers.unshift(upped);

            ngModel.$validators.iban = function (modelValue) {
                if (ngModel.$isEmpty(modelValue)) {
                    return true;
                }

                var A = 'A'.charCodeAt(0), Z = 'Z'.charCodeAt(0), iban = modelValue.toUpperCase().replace(/\s/g, '');

                iban = iban.substr(4) + iban.substr(0, 4);

                var remainder = iban.split('').map(function (n) {
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
