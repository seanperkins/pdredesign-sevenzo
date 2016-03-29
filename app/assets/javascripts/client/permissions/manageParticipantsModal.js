(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('manageParticipantsModal', manageParticipantsModal);

  function manageParticipantsModal() {
    return {
      restrict: 'E',
      scope: {},
      transclude: true,
      replace: true,
      templateUrl: 'client/permissions/manage_permission.html',
      controller: 'ManageParticipantsModalCtrl',
      controllerAs: 'manageParticipantsModal'
    }
  }
})();
