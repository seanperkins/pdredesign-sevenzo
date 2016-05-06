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
    }).state('inventory_assign', {
      url: '/inventories/:id/assign',
      authenticate: true,
      showFullWidth: true,
      resolve: {
        current_inventory: ['$stateParams', 'Inventory', function($stateParams, Inventory) {
          return Inventory.get({inventory_id: $stateParams.id}).$promise;
        }]
      },
      views: {
        'full-width': {
          controller: 'InventoryAssignCtrl',
          controllerAs: 'inventoryAssign',
          templateUrl: 'client/inventories/assign_inventory.html'
        }
      }
    }).state('inventories_edit', {
      url: '/inventories/:inventory_id/edit',
      authenticate: true,
      resolve: {
        currentParticipant: ['$stateParams', 'Inventory', function($stateParams, Inventory) {
          return Inventory.participantResponse({inventory_id: $stateParams.inventory_id})
              .$promise;
        }]
      },
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
          controller: 'InventoryEditSidebarCtrl',
          controllerAs: 'inventoryEditSidebar',
          templateUrl: 'client/inventories/edit_sidebar.html'
        }
      }
    }).state('inventory_dashboard', {
      url: '/inventories/:inventory_id/dashboard',
      authenticate: true,
      resolve: {
        inventory: ['$stateParams', 'Inventory', function($stateParams, Inventory) {
          return Inventory.get({inventory_id: $stateParams.inventory_id}).$promise;
        }]
      },
      views: {
        '': {
          controller: 'InventoryDashboardCtrl',
          controllerAs: 'inventoryDashboard',
          templateUrl: 'client/inventories/dashboard.html'
        },
        'sidebar': {
          controller: 'InventorySidebarCtrl',
          controllerAs: 'inventorySidebar',
          templateUrl: 'client/inventories/sidebar.html'
        }
      }
    }).state('inventory_analysis_assign', {
      url: '/inventories/:inventory_id/analyses/:id/assign',
      authenticate: true,
      showFullWidth: true,
      resolve: {
        current_inventory: ['$stateParams', 'Inventory', function($stateParams, Inventory) {
          return Inventory.get({inventory_id: $stateParams.inventory_id}).$promise;
        }],
        current_analysis: ['$stateParams', 'Analysis', function($stateParams, Analysis) {
          return Analysis.get({inventory_id: $stateParams.inventory_id, id: $stateParams.id}).$promise;
        }]
      },
      views: {
        'full-width': {
          controller: 'AnalysisAssignCtrl',
          controllerAs: 'analysisAssign',
          templateUrl: 'client/inventories/assign_analysis.html'
        }
      }
    }).state('inventories_report', {
      url: '/inventories/:inventory_id/report',
      authenticate: true,
      views: {
        '': {
          resolve: {
            inventory: ['Inventory', '$stateParams', function(Inventory, $stateParams) {
              return Inventory.get({inventory_id: $stateParams.inventory_id}).$promise;
            }]
          },
          controller: 'InventoryReportCtrl',
          controllerAs: 'inventoryReport',
          templateUrl: 'client/inventories/inventory_report.html'
        },
        'sidebar': {
          resolve: {
            inventory: ['Inventory', '$stateParams', function(Inventory, $stateParams) {
              return Inventory.get({inventory_id: $stateParams.inventory_id}).$promise;
            }]
          },
          controller: 'InventoryReportSidebarCtrl',
          controllerAs: 'inventoryReportSidebar',
          templateUrl: 'client/inventories/report_sidebar.html'
        }
      },
      params: {
        shared: false
      }
    }).state('inventories_shared_report', {
      url: '/inventories/shared/:inventory_id/report',
      views: {
        '': {
          resolve: {
            inventory: ['Inventory', '$stateParams', function(Inventory, $stateParams) {
              return Inventory.get({inventory_id: $stateParams.inventory_id}).$promise;
            }]
          },
          controller: 'InventoryReportCtrl',
          controllerAs: 'inventoryReport',
          templateUrl: 'client/inventories/inventory_report.html',
        },
        'sidebar': {
          resolve: {
            inventory: ['Inventory', '$stateParams', function(Inventory, $stateParams) {
              return Inventory.get({inventory_id: $stateParams.inventory_id}).$promise;
            }]
          },
          controller: 'InventoryReportSidebarCtrl',
          controllerAs: 'inventoryReportSidebar',
          templateUrl: 'client/inventories/report_sidebar.html'
        }
      },
      params: {
        shared: true
      }
    }).state('inventory_analysis_consensus', {
      url: '/inventories/:inventory_id/analyses/:analysis_id/consensus/:id',
      authenticate: true,
      resolve: {
        current_context: function () { return "analysis"; },
        current_entity: ['$stateParams', 'Analysis', function($stateParams, Analysis) {
          return Analysis.get({inventory_id: $stateParams.inventory_id, id: $stateParams.analysis_id}).$promise;
        }],
        consensus: ['$stateParams', 'Consensus', function($stateParams, Consensus) {
          return {id: 104, responder_id: 7, responder_type: "Analysis", rubric_id: 1};
        }]
      },
      views: {
        '': {
          controller: 'ConsensusShowCtrl',
          //controllerAs: 'consensusShow',
          templateUrl: 'client/views/consensus/show.html'
        },
        'sidebar': {
          controller: 'SidebarResponseCardCtrl',
          templateUrl: 'client/views/sidebar/response_card.html'
        }
      }
    });
  }
})();
