PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('terms_of_use', {
      url: '/terms-of-use',
      views: {
        '': {
          controller: '',
          templateUrl: 'client/views/static/terms_of_use.html'
        },
      }
    })
   .state('privacy', {
      url: '/privacy',
      views: {
        '': {
          controller: '',
          templateUrl: 'client/views/static/privacy.html'
        },
      }
    });

  }
]);


