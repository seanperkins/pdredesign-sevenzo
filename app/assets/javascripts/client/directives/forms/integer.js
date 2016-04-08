(function() {
  'use strict';
  angular.module('PDRClient')
    .directive('integer', integer);
    
    function integer () {
      return {
        require: 'ngModel',
        restrict: 'A',
        link: integerLink
      }
    };

    function integerLink (scope, elem, attrs, ctrl) {
      elem.on('keypress', function (event) {
        var code = event.charCode || event.keyCode;

        // allow only backspace, right, left, and numeric chars
        if (!_.include( [8, 37, 39], code ) && (code < 48 || code > 57)) {
          event.preventDefault();
        }
      });
    };
})();
