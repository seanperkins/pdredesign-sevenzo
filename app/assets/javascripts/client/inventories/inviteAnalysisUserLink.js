(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('inviteAnalysisUserLink', inviteAnalysisUserLink);

  function inviteAnalysisUserLink() {
    return {
      restrict: 'E',
      scope: {
        sendInvite:'@'
      },
      templateUrl: 'client/inventories/invite_analysis_user_link.html',
      controller: 'InviteAnalysisUserLinkCtrl',
      controllerAs: 'inviteAnalysisUserLink',
      replace: true
    }
  }
})();
