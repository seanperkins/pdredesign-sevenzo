(function() {
  'use strict';
  angular.module('PDRClient')
    .directive('float', float);
    
    function float () {
      return {
        require: 'ngModel',
        restrict: 'A',
        link: floatLink
      }
    };

    function floatLink (scope, elem, attrs, ctrl) {
      elem.on('keypress', function (event) {
        var code = event.charCode || event.keyCode;

        // allow only one dot
        if (code === 46 && event.target.value.match(/\./)) {
          event.preventDefault();
        };

        // allow only backspace, right, left, dot and numeric chars
        if (!_.include( [8, 37, 39, 46], code ) && (code < 48 || code > 57)) {
          event.preventDefault();
        }
      });
    };
})();
