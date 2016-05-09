(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('participant', participant);

  function participant() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        user: '='
      },
      templateUrl: 'client/inventories/participant_view.html'
    }
  }
})();