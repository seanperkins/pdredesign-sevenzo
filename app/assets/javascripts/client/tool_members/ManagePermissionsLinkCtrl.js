(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('ManagePermissionsLinkCtrl', ManagePermissionsLinkCtrl);

  ManagePermissionsLinkCtrl.$inject = [
    '$modal',
    '$scope'
  ];

  function ManagePermissionsLinkCtrl($modal, $scope) {
    var vm = this;
    vm.open = function () {
      vm.modal = $modal.open({
        templateUrl: 'client/tool_members/modals/manage_permissions_modal.html',
        scope: $scope,
        size: 'lg',
        windowClass: 'request-access-window'
      });
    };

    vm.close = function () {
      vm.modal.dismiss();
    };
  }
})();