PDRClient.controller('ConsensusCreateCtrl', [
  '$modal',
  '$scope',
  '$timeout',
  '$location',
  'SessionService',
  'Consensus',
  '$stateParams',
  function($modal, $scope, $timeout, $location, SessionService, Consensus, $stateParams) {
    $scope.isError  = null;

    $scope.assessmentId = $stateParams.assessment_id;
    $scope.responseId   = $stateParams.response_id;

    $scope.createConsensus = function() {
      Consensus
        .create({assessment_id: $scope.assessmentId}, {})
        .$promise
        .then(function(response){
          $location.path('/assessments/'+ $scope.assessmentId +'/consensus/' + response.id);
      }, function(data){

        $scope.isError = true;
        $scope.notification  = "Consensus was not created.";
        $modal.open({
          templateUrl: 'client/views/shared/notification_modal.html',
          scope: $scope
        });

      });
    };

    $timeout(function(){
      $scope.createConsensus();
    });

  }
]);
