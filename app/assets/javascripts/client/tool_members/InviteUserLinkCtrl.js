(function() {
  'use strict';

  angular.module('PDRClient')
    .controller('InviteUserLinkCtrl', InviteUserLinkCtrl);

  InviteUserLinkCtrl.$inject = [
    '$modal',
    '$scope'
  ];

  function InviteUserLinkCtrl($modal, $scope) {
    var vm = this;
    vm.open = function() {
      vm.modal = $modal.open({
        templateUrl: 'client/tool_members/modals/invite_members_modal.html',
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
