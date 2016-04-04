(function() {
  'use strict';
  angular.module('PDRClient')
    .directive('float', [function () {
      return {
        require: 'ngModel',
        restrict: 'A',
        link: function (scope, elem, attrs, ctrl) {
          elem.on('keypress', function (event) {
            var code = event.charCode || event.keyCode;
            if (!_.include( [8, 37, 39, 44, 46], code ) && (code < 48 || code > 57)) {
              event.preventDefault();
            }
          });

          ctrl.$parsers.unshift( function (viewValue) {
            // avoiding FP errors here
            var value = viewValue.replace(/,/, '.');
            value = value.substring(0, value.indexOf('.') + 3);
            value = value.replace( /\./, '' );
            value = value.replace( /%/, '' );
            value = value.replace( /'/, '' );
            return value;
          });
          ctrl.$formatters.push( function (viewValue) {
            // division/100 work fine with FP
            return viewValue ? viewValue / 100 : viewValue;
          });
        }
      }
    }]);
})();
