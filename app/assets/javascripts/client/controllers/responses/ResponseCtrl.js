PDRClient.controller('ResponseCtrl', [
    '$scope',
    '$timeout',
    'SessionService',
    'Assessment',
    '$stateParams',
    function($scope, $timeout, SessionService, Assessment, $stateParams) {
      $scope.user = SessionService.getCurrentUser();

      $scope.assessmentId = $stateParams.assessment_id;
      $scope.responseId   = $stateParams.response_id;
      $scope.assessment   = Assessment.get({id: $scope.assessmentId});
    }
]);
