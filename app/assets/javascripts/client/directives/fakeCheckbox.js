(function() {
  'use strict';
  angular.module('PDRClient')
      .directive('fakeCheckbox', function () {
        return {
          restrict: 'E',
          scope: {
            model: "="
          },
          replace: true,
          templateUrl: 'client/views/directives/fake_checkbox.html'
        }
      });
})();
