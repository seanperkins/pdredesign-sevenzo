PDRClient.directive('assessmentChart', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {
          assessmentId: '@',
          editable: '@',
        },
        templateUrl: 'client/views/directives/assessment_chart.html',
        controller: [
          '$scope',
          '$timeout',
          '$attrs',
          'Priority',
          function($scope, $timeout, $attrs, Priority) {

            $scope.updateCategories = function() {
              $scope.loading = true;

              Priority
                .query({assessment_id: $attrs.assessmentId})
                .$promise
                .then(function(categories) {
                  $scope.categories = categories;
                  $scope.loading = false;
                  $scope.createChart();
                });
            };

            $scope.categoryNames = function() {
              var categories = [];

              angular.forEach($scope.categories, function(category, index) {
                categories.push(category.name);
              });
              return categories;
            };

            $scope.diagnosticMins = function() {
              var mins = [];

              angular.forEach($scope.categories, function(category, index) {
                mins.push(category.diagnostic_min);
              });
              return mins;
            };

            $scope.averages = function() {
              var averages = [];

              angular.forEach($scope.categories, function(category, index) {
                averages.push(parseFloat(category.average));
              });
              return averages;
            };

            $scope.createChart = function() {
              $('#assessment-chart').highcharts({
                chart: {
                  polar: true,
                  type: 'line',
                  backgroundColor: 'transparent'
                },
                title: {
                  text: null
                },
                pane: {
                  size: '80%'
                },
                legend: {
                  enabled: false
                },
                xAxis: {
                  categories: $scope.categoryNames(),
                  tickmarkPlacement: 'on',
                  tickInterval: 1,
                  lineWidth: 0
                },
                yAxis: {
                  gridLineInterpolation: 'polygon',
                  lineWidth: 0,
                  min: 0
                },
                tooltip: {
                  shared: true
                },
                credits: {
                  enabled: false
                },
                series: [{
                    color: '#EDB8BE',
                    name: 'Diagnostic Min',
                    data: $scope.diagnosticMins(),
                    pointPlacement: 'on'
                }, {
                    color: '#5F8D9C',
                    name: 'Averages',
                    data: $scope.averages(),
                    pointPlacement: 'on'
                }]
              });
            };

            $attrs.$observe('assessmentId', function(id) {
              if(id) $scope.updateCategories(id);
            });

        }],
      };
    }
]);
