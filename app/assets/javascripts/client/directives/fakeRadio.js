(function() {
  'use strict';
  angular.module('PDRClient')
      .directive('fakeRadio', function () {
        return {
          restrict: 'E',
          scope: {
            model: "=",
            value: "@"
          },
          replace: true,
          templateUrl: 'client/views/directives/fake_radio.html'
        }
      });
})();
