(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('inventoryEntityStatus', inventoryEntityStatus);

  function inventoryEntityStatus() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        entity: '='
      },
      templateUrl: 'client/inventories/entity_status.html',
      controller: 'InventoryEntityStatusCtrl',
      controllerAs: 'entityStatus'
    };
  }
})();