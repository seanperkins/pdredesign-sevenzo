(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('inviteAnalysisUser', inviteAnalysisUser);

  function inviteAnalysisUser() {
    return {
      restrict: 'E',
      scope: {
        sendInvite:'='
      },
      templateUrl: 'client/inventories/invite_analysis_user.html',
      controller: 'InviteAnalysisUserCtrl',
      controllerAs: 'inviteAnalysisUser',
      replace: true
    }
  }
})();
