PDRClient.directive('assessmentPriority', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          assessmentId: '@',
          editable: '@',
        },
        templateUrl: 'client/views/directives/assessment_priority.html',
        controller: [
          '$scope',
          '$timeout',
          '$attrs',
          'Priority',
          function($scope, $timeout, $attrs, Priority) {
            $scope.scoredAverage = function(category) {
              return Math.ceil(category.average);
            };

            $scope.roundedAverage = function(score) {
              return parseFloat(score).toFixed(2);
            };

            $scope.updateCategories = function() {
              $scope.loading = true;

              Priority
                .query({assessment_id: $attrs.assessmentId})
                .$promise
                .then(function(categories) {
                  $scope.categories = categories;
                  if($scope.editable == "true"){
                   $scope.setupDnD();
                  }
                  $scope.loading = false;
                });
            };

            $scope.savePriority = function() {
              var order = [];

              $('tr.category').each(function(index, category) {
                order.push($(category).attr('id'));
              });

              $scope.loading = true;
              Priority
                .save({assessment_id: $attrs.assessmentId}, {order: order})
                .$promise
                .then(function() {
                  $scope.loading = false;
                  $scope.updateCategories();
                });
            };

            $attrs.$observe('assessmentId', function(id) {
              if(id) $scope.updateCategories(id);
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
