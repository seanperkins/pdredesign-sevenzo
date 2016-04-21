(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InviteAnalysisUserLinkCtrl', InviteAnalysisUserLinkCtrl);

  InviteAnalysisUserLinkCtrl.$inject = [
    '$modal',
    '$scope'
  ];

  function InviteAnalysisUserLinkCtrl($modal, $scope) {
    var vm = this;
    vm.open = function() {
      vm.modal = $modal.open({
        templateUrl: 'client/inventories/invite_analysis_user_modal.html',
        scope: $scope,
        windowClass: 'request-access-window'
      });
    };

    vm.close = function() {
      vm.modal.dismiss();
    };
    
    $scope.$on('invite-sent', function() {
      vm.close();
    });
  }
})();
