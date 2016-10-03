(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('participantList', participantList);

  function participantList() {
    return {
      restrict: 'E',
      scope: {
        participants: '='
      },
      templateUrl: 'client/tool_members/participant_list.html'
    }
  }
})();