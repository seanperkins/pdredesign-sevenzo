(function() {
  'use strict';
  
  angular.module('PDRClient')
      .controller('InventoryLinksCtrl', InventoryLinksCtrl);

  InventoryLinksCtrl.$inject = [
    '$scope',
    'EntryItemService'
  ];
  
  function InventoryLinksCtrl($scope, EntryItemService) {
    var vm = this;

    vm.orderLinks = function(items) {
      return EntryItemService.orderLinks(items);
    };

    
    vm.location = function(link) {
      var inventory_route_stem = '#/inventories/' + $scope.id;
      switch(link.type) {
        case 'finish':
          return inventory_route_stem + '/assign';
        case 'dashboard':
          return inventory_route_stem + '/dashboard';
        case 'inventory':
          return inventory_route_stem + '/edit'
      }
    }
  }
})();