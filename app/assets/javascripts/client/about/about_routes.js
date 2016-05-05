(function() {
  'use strict';
  angular.module('PDRClient')
      .config(AboutRoutes);

  AboutRoutes.$inject = [
    '$stateProvider',
    '$urlRouterProvider'
  ];

  function AboutRoutes($stateProvider, $urlRouterProvider) {
    $stateProvider.state('about', {
      url: '/about',
      abstract: true,
      views: {
        'sidebar': {
          controller: 'AboutSidebarCtrl',
          controllerAs: 'aboutSidebar',
          templateUrl: 'client/about/about_sidebar.html'
        }
      }
    }).state('about.pdredesign', {
      url: '/pdredesign',
      views: {
        '@': {
          templateUrl: 'client/about/pdredesign.html'
        }
      }
    }).state('about.ra-assessment', {
      url: '/ra/assessment',
      views: {
        '@': {
          templateUrl: 'client/about/ra-assessment.html'
        }
      }
    }).state('about.dt-inventory', {
      url: '/dt/inventory',
      views: {
        '@': {
          templateUrl: 'client/about/dt-inventory.html'
        }
      }
    }).state('about.dt-analysis', {
      url: '/dt/analysis',
      views: {
        '@': {
          templateUrl: 'client/about/dt-analysis.html'
        }
      }
    });

    $urlRouterProvider.otherwise('/');
  }
})();
