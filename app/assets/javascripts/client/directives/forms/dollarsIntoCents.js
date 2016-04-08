(function() {
  'use strict';
  angular.module('PDRClient')
    .directive('dollarsIntoCents', dollarsIntoCents);
    
    function dollarsIntoCents () {
      return {
        require: 'ngModel',
        restrict: 'A',
        link: dollarsIntoCentsLink
      }
    };

    function dollarsIntoCentsLink (scope, elem, attrs, ctrl) {
      // multiplicating by 100
      ctrl.$parsers.unshift( function (viewValue) {
        // multiplication*100 while avoiding FP errors
        var value = viewValue.replace(/,/, '.');
        value = value.substring(0, value.indexOf('.') + 3);
        value = value.replace( /\./, '' );
        value = value.replace( /%/, '' );
        value = value.replace( /'/, '' );
        return value;
      });

      // dividing by 100
      ctrl.$formatters.push( function (viewValue) {
        // division/100 work fine with FP
        return viewValue ? viewValue / 100 : viewValue;
      });
    };
})();
