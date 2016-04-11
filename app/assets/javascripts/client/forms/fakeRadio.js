(function() {
  'use strict';
  angular.module('PDRClient')
      .directive('fakeRadio', fakeRadio);
  
  function fakeRadio () {
    return {
      restrict: 'E',
      scope: {
        model: '=',
        value: '@'
      },
      replace: true,
      templateUrl: 'client/forms/fake_radio.html'
    }
  };
})();
