PDRClient.controller('ConsensusShowCtrl', [
    '$scope',
    '$http',
    '$timeout',
    'SessionService',
    'Assessment',
    'Consensus',
    'ConsensusHelper',
    '$stateParams',
    'consensus',
    function($scope, $http, $timeout, SessionService, Assessment, Consensus, ConsensusHelper, $stateParams, consensus) {
      $scope.user = SessionService.getCurrentUser();

      $scope.assessmentId = $stateParams.assessment_id;
      $scope.responseId   = $stateParams.response_id;
      $scope.assessment   = Assessment.get({id: $scope.assessmentId});
      $scope.consensus    = consensus
      
      $scope.exportToPDF  = function(){
        ConsensusHelper.consensuToPDF($scope.assessmentId, $scope.responseId);
      };

      $scope.exportToCSV  = function(){
        ConsensusHelper.consensuToCSV($scope.assessment, $scope.responseId);
      };
    }
]);
