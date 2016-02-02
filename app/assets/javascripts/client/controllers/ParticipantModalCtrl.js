PDRClient.controller('ParticipantModalCtrl', ['$scope', 'SessionService', 'Assessment', '$stateParams',
    function($scope, SessionService, Assessment, $stateParams) {

      $scope.animate = function(user){
        user.hide = "no";
      };

    }
]);
