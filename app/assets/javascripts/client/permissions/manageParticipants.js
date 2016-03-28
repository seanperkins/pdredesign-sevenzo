(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('manageParticipants', manageParticipants);

  function manageParticipants() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'client/permissions/manage_participants.html',
      scope: {
        'assessmentId': '@',
        'sendInvite': '@',
        'numberOfRequests': '@',
        'autoShow': '@'
      },
      controller: 'ManageParticipantsCtrl'
    }
  }
})();
