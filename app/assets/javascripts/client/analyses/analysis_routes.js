(function() {
  'use strict';

  angular.module('PDRClient')
      .config(AnalysisRoutes);

  AnalysisRoutes.$inject = [
    '$stateProvider'
  ];

  function AnalysisRoutes($stateProvider) {
    $stateProvider.state('analyses', {
      url: '/analyses',
      authenticate: true,
      views: {
        '': {
          controller: 'AnalysesIndexCtrl',
          controllerAs: 'analysesIndex',
          templateUrl: 'client/analyses/analyses_index.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_generic.html'
        }
      }
    }).state('inventory_analysis_dashboard', {
      url: '/inventories/:inventory_id/analyses/:id/dashboard',
      authenticate: true,
      resolve: {
        inventory: ['$stateParams', 'Inventory', function($stateParams, Inventory) {
          return Inventory.get({inventory_id: $stateParams.inventory_id}).$promise;
        }],
        current_analysis: ['$stateParams', 'Analysis', function($stateParams, Analysis) {
          return Analysis.get({inventory_id: $stateParams.inventory_id, id: $stateParams.id}).$promise;
        }]
      },
      views: {
        '': {
          controller: 'AnalysisDashboardCtrl',
          controllerAs: 'analysisDashboard',
          templateUrl: 'client/inventories/analysis_dashboard.html'
        },
        'sidebar': {
          controller: 'AnalysisSidebarCtrl',
          controllerAs: 'analysisSidebar',
          templateUrl: 'client/inventories/analysis_dashboard_sidebar.html'
        }
      }
    }).state('inventory_analysis_consensus_create', {
      url: '/inventories/:inventory_id/analyses/:analysis_id/consensus',
      authenticate: true,
      resolve: {
        current_context: function() {
          return "analysis";
        }
      },
      views: {
        '': {
          controller: 'ConsensusCreateCtrl'
        }
      }
    }).state('inventory_analysis_consensus', {
      url: '/inventories/:inventory_id/analyses/:analysis_id/consensus/:id',
      authenticate: true,
      resolve: {
        current_context: function() {
          return "analysis";
        },
        current_entity: ['$stateParams', 'Analysis', function($stateParams, Analysis) {
          return Analysis.get({inventory_id: $stateParams.inventory_id, id: $stateParams.analysis_id}).$promise;
        }],
        consensus: ['$stateParams', 'AnalysisConsensus', function($stateParams, AnalysisConsensus) {
          return AnalysisConsensus.get({
            inventory_id: $stateParams.inventory_id,
            analysis_id: $stateParams.analysis_id,
            id: $stateParams.id
          }).$promise;
        }]
      },
      views: {
        '': {
          controller: 'ConsensusShowCtrl',
          templateUrl: 'client/views/consensus/show.html'
        },
        'sidebar': {
          controller: 'SidebarResponseCardCtrl',
          templateUrl: 'client/views/sidebar/response_card.html'
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
    });
  }
})();