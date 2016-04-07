(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('manageInventoryAccessRequests', manageInventoryAccessRequests);

  function manageInventoryAccessRequests() {
    return {
      restrict: 'E',
      scope: {
        inventoryId: '='
      },
      templateUrl: 'client/inventories/manage_inventory_access_requests.html',
      controller: 'ManageInventoryAccessRequestsCtrl',
      controllerAs: 'manageInventoryAccessRequests',
      replace: true
    }
  }
})();
