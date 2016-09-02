(function () {
  'use strict';
  angular.module('PDRClient')
    .config(StaticRoutes);

  StaticRoutes.$inject = [
    '$stateProvider'
  ];

  function StaticRoutes($stateProvider) {
    $stateProvider.state('terms_of_use', {
      url: '/terms-of-use',
      showFullWidth: true,
      views: {
        'full-width': {
          controller: '',
          templateUrl: 'client/views/static/terms_of_use.html'
        }
      }
    })
      .state('privacy', {
        url: '/privacy',
        showFullWidth: true,
        views: {
          'full-width': {
            controller: '',
            templateUrl: 'client/views/static/privacy.html'
          }
        }
      });
  }
})();
