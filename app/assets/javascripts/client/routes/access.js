PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('grant_access', {
      url: '/grant/:token',
      authenticate: true,
      views: {
        '': {
          controller: 'GrantAccessCtrl',
          templateUrl: 'client/views/access/grant.html'
        },
      }
    });
  }
]);

