(function() {
  'use strict';

  angular.module('PDRClient')
      .config(ResponsesConfig);

  ResponsesConfig.$inject = [
      '$stateProvider'
  ];

  function ResponsesConfig($stateProvider) {
    $stateProvider.state('response_edit', {
          url: '/assessments/:assessment_id/responses/:response_id',
          authenticate: true,
          resolve: {
            current_context: function () { return 'assessment'; },
            current_entity: ['$stateParams', 'Assessment', function($stateParams, Assessment) {
              return Assessment.get({id: $stateParams.assessment_id}).$promise;
            }],
            consensus: ['Response', '$stateParams', function(Response, $stateParams) {
              return Response
                .get({assessment_id: $stateParams.assessment_id,
                      id: $stateParams.response_id,
                      team_role: null})
                .$promise;
            }]
          },
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
})();