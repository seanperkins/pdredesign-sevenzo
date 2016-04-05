(function() {
  'use strict';
  angular.module('PDRClient')
      .config(InventoryRoutes);

  InventoryRoutes.$inject = [
    '$stateProvider'
  ];

  function InventoryRoutes($stateProvider) {
    $stateProvider.state('inventories', {
      url: '/inventories',
      authenticate: true,
      views: {
        '': {
          resolve: {
            inventory_result: ['Inventory', function(Inventory) {
              return Inventory.query().$promise;
            }]
          },
          controller: 'InventoryIndexCtrl',
          controllerAs: 'inventoryIndex',
          templateUrl: 'client/inventories/inventory_index.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_generic.html'
        }
      }
    });

    $stateProvider.state('inventories_edit', {
      url: '/inventories/:inventory_id/edit',
      authenticate: true,
      views: {
        '': {
          resolve: {
            inventory: ['Inventory', '$stateParams', function(Inventory, $stateParams) {
              return Inventory.get({inventory_id: $stateParams.inventory_id}).$promise;
            }]
          },
          controller: 'InventoryEditCtrl',
          controllerAs: 'inventoryEdit',
          templateUrl: 'client/inventories/inventory_edit.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_generic.html'
        }
      }
    });
  }
})();
