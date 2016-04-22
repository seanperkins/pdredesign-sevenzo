(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('inventoryLinks', inventoryLinks);

  function inventoryLinks() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        id: '@',
        links: '='
      },
      controller: 'InventoryLinksCtrl',
      controllerAs: 'inventoryLinks',
      templateUrl: 'client/inventories/inventory_links.html'
    }
  }
})();