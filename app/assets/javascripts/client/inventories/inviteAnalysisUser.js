(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('inviteAnalysisUser', inviteAnalysisUser);

  function inviteAnalysisUser() {
    return {
      restrict: 'E',
      scope: {},
      templateUrl: 'client/inventories/invite_analysis_user.html',
      controller: 'InviteAnalysisUserCtrl',
      controllerAs: 'inviteAnalysisUser',
      replace: true
    }
  }
})();
