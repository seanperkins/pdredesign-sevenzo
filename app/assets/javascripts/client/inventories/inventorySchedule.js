(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('inventorySchedule', inventorySchedule);

  function inventorySchedule() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        inventory: '='
      },
      templateUrl: 'client/inventories/inventory_schedule.html',      
      controller: 'InventoryScheduleCtrl',
      controllerAs: 'inventorySchedule'
    }
  }
})();