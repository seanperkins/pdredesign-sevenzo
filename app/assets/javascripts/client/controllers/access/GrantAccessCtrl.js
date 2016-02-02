PDRClient.controller('GrantAccessCtrl', ['$scope', '$stateParams', '$state', 'Access',
    function($scope, $stateParams, $state, Access) {
      Access
        .save({token: $stateParams.token, action: 'grant'}, null)
        .$promise
        .then(function(data){
          $state.go('assessment_dashboard', {
            id: data.assessment_id,
            showModal: true
          });
        });
    }
]);
