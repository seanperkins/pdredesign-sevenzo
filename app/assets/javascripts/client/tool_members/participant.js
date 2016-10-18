(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('participant', participant);

  function participant() {
    return {
      restrict: 'E',
      scope: {
        user: '='
      },
      templateUrl: 'client/tool_members/participant_view.html',
      controller: 'ParticipantCtrl',
      controllerAs: 'vm'
    }
  }
})();