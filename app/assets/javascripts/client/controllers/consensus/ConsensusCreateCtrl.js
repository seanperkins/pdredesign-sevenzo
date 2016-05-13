PDRClient.controller('ConsensusCreateCtrl', [
  '$modal',
  '$scope',
  '$timeout',
  '$location',
  'SessionService',
  'ConsensusService',
  '$stateParams',
  'current_context',
  function($modal, $scope, $timeout, $location, SessionService, ConsensusService, $stateParams, current_context) {
    $scope.isError  = null;

    $scope.createConsensus = function() {
      ConsensusService
        .setContext(current_context)
        .createConsensus()
        .then(function(response){
          ConsensusService
            .setContext(current_context)
            .redirectToCreatedConsensus(response.id);
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
