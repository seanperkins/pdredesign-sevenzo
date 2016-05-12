(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('primaryButton', primaryButton);

  function primaryButton() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        icon: '@',
        link: '@',
        text: '@',
        clickFn: '&'
      },
      templateUrl: 'client/buttons/primary_button.html'
    }
  }
})();