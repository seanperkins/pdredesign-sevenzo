PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('response_edit', {
     url: '/assessments/:assessment_id/responses/:response_id',
     authenticate: true,
     views: {
       '': {
         controller: 'ResponseCtrl',
         templateUrl: 'client/views/responses/edit.html'
       },
       'sidebar': {
         controller: 'SidebarResponseCardCtrl',
         templateUrl: 'client/views/sidebar/response_card.html'
       }
     }
   })
   .state('response_create', {
     url: '/assessments/:assessment_id/responses',
     authenticate: true,
     views: {
       '': {
         controller: 'ResponseCreateCtrl',
         template: ''
       }
     }
   });

  }
]);


