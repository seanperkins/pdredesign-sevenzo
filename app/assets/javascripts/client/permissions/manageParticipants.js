(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('manageParticipants', manageParticipants);

  function manageParticipants() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'client/permissions/participants_button.html',
      scope: {
        'sendInvite': '@',
        'numberOfRequests': '@',
        'autoShow': '@'
      },
      link: manageParticipantsLink,
      controller: 'ManageParticipantsCtrl',
      controllerAs: 'manageParticipants'
    }
  }

  function manageParticipantsLink(scope, element, attributes, controller) {
    if (scope.autoShow === "true" ) {
      controller.showAddParticipants();
    }
  }
})();
