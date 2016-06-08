PDRClient.directive('takeAway', [
  function() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'client/views/directives/take_away.html',
      scope: {
        assessmentId: '@',
      },
      controller: [
        '$scope',
        'Assessment',
        function($scope, Assessment) {

          $scope.assessment = {};

          Assessment
            .get({id: $scope.assessmentId})
            .$promise.then(
              function(assessment) {
                $scope.assessment = assessment;
            });

          $scope.isFacilitator = function() {
            return $scope.assessment.is_facilitator == true;
          };

          $scope.save = function(assessment) {
            Assessment.save({ id: assessment.id }, assessment);
          };
      }],
    };
}]);
