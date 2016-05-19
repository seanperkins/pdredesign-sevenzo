(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('edsurgeButton', edsurgeButton);

  function edsurgeButton() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        buttonLink: '='
      },
      templateUrl: 'client/proprietary/edsurge_button.html'
    }
  }
})();