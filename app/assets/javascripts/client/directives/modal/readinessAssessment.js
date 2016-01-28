PDRClient.directive('readinessAssessmentModal', ['$modal',
    function($modal) {
      return {
        restrict: 'E',
        replace: false,
        templateUrl: 'client/views/directives/readiness_assessment_link.html',
        scope: {
          'title': '@',
        },
        controller: ['$scope', '$modal', function($scope, $modal) {

          $scope.pdrOverview  = function() {
            $scope.modal = $modal.open({
              templateUrl: 'client/views/modals/pdr_overview.html',
              scope: $scope
            });
          };

          $scope.close = function() {
            $scope.modal.dismiss('cancel');
          };

        }],
     };
}]);
