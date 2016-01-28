PDRClient.controller('ResponseCreateCtrl', [
  '$modal',
  '$timeout',
  '$scope',
  '$location',
  '$stateParams',
  'SessionService',
  'Response',
  'Assessment',
  function($modal, $timeout, $scope, $location, $stateParams, SessionService, Response, Assessment) {
    $scope.isError  = null;

    $scope.assessmentId = $stateParams.assessment_id;

    $scope.getAssessment = function(){
      return Assessment.get({id: $scope.assessmentId});
    };

    $scope.createResponse = function(assessmentId, rubric_id) {
      Response
      .save({assessment_id: assessmentId},  {rubric_id: rubric_id})
      .$promise
      .then(function(response){
        $location.url('/assessments/'+ $scope.assessmentId +'/responses/' + response.id);
      }, function(data){
        $location.url('/assessments');
      });
    };

    $timeout(function(){
      $scope.getAssessment()
        .$promise
        .then(function(assessment){
          $scope.createResponse($scope.assessmentId, assessment.rubric_id);
        });
    });
  }
]);
