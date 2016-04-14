(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ManageInventoryPermissionsLinkCtrl', ManageInventoryPermissionsLinkCtrl);

  ManageInventoryPermissionsLinkCtrl.$inject = [
    '$modal',
    '$scope'
  ];

  function ManageInventoryPermissionsLinkCtrl($modal, $scope) {
    var vm = this;
    vm.open = function() {
      vm.modal = $modal.open({
        templateUrl: 'client/inventories/manage_inventory_permissions_modal.html',
        scope: $scope,
        size: 'lg',
        windowClass: 'request-access-window'
      });
    };

    vm.close = function() {
      vm.modal.dismiss();
    };

    vm.save = function() {
      $scope.$broadcast("save");
    };

    $scope.$on('close-modal', function() {
      vm.close();
    });
  }
})();
