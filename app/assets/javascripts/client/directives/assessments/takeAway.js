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
          $scope.saving     = false;

          Assessment.get({id: $scope.assessmentId})
          .$promise.then(
            function(assessment) {
              $scope.assessment = assessment;

              if($scope.isTakeawayEmpty()) $scope.setEditing(true);
          });

          $scope.isFacilitator = function() {
            return $scope.assessment.is_facilitator == true;
          };

          $scope.isTakeawayEmpty = function() {
            return $scope.assessment.report_takeaway == null
                || $scope.assessment.report_takeaway == '';
          };

          $scope.setEditing = function(editing) {
            $scope.editing = editing;
          };

          $scope.save = function(assessment) {
            $scope.saving = true;
            Assessment.save({ id: assessment.id }, assessment)
            .$promise.then(function(){
              $scope.saving = false;
              $scope.setEditing(false);
            });
          };

      }],
    };
}]);
