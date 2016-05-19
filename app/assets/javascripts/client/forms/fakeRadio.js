(function() {
  'use strict';
  angular.module('PDRClient')
      .directive('fakeRadio', fakeRadio);
  
  function fakeRadio () {
    return {
      restrict: 'E',
      scope: {
        proxyNgModel: '=',
        proxyValue: '@',
        proxyNgValue: '='
      },
      replace: true,
      templateUrl: 'client/forms/fake_radio.html',
      compile: function (tElement, tAttributes) {
        if (tAttributes.hasOwnProperty('proxyValue')) {
          tElement.prepend("<input type='radio' ng-model='proxyNgModel' value='{{proxyValue}}'>");
        } else if (tAttributes.hasOwnProperty('proxyNgValue')) {
          tElement.prepend("<input type='radio' ng-model='proxyNgModel' ng-value='proxyNgValue'>");
        }
      }
    }
  };
})();
