PDRClient.directive('sharedAssessmentPriority', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          token: '@',
          editable: '@',
        },
        templateUrl: 'client/views/directives/assessment_priority.html',
        controller: [
          '$scope',
          '$timeout',
          '$attrs',
          'SharedPriority',
          function($scope, $timeout, $attrs, SharedPriority) {
            $scope.scoredAverage = function(category) {
              return Math.ceil(category.average);
            };

            $scope.roundedAverage = function(score) {
              return parseFloat(score).toFixed(2);
            };

            $scope.updateCategories = function() {
              $scope.loading = true;
              SharedPriority
                .query({token: $attrs.token})
                .$promise
                .then(function(categories) {
                  $scope.categories = categories;
                  if($scope.editable == "true"){
                   $scope.setupDnD();
                  }
                  $scope.loading = false;
                });
            };

            $attrs.$observe('token', function(token) {
              if(token) $scope.updateCategories(token);
            });

            $scope.setupDnD = function() {
              $timeout(function() {
                $(".table-diagnostic").tableDnD();
              });
            };
        }],
      };
    }
]);
