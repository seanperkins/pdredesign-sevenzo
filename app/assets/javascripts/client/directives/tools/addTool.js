PDRClient.directive('addTool', [
    function() {
      return {
        restrict: 'E',
        scope: {
          category: '='
        },
        templateUrl: 'client/views/directives/add_tool.html',
        controller: [
          '$scope',
          '$timeout',
          '$location',
          '$modal',
          'Tool',
          'SessionService',
          function($scope, $timeout, $location, $modal, Tool, SessionService){
            $scope.alerts  = [];
            $scope.tool    = {};

            $scope.showAddToolModal = function() {
              $('ul.tool').find('li').not(this).popover('hide');

              $scope.modalInstance = $modal.open({
                templateUrl: 'client/views/modals/add_tool.html',
                scope: $scope
              });
            };

            $scope.hideModal = function() {
              $scope.modalInstance.dismiss('cancel');
            };

            $scope.create  = function(tool) {
              tool.tool_category_id = $scope.category.id;
              Tool
                .create(tool)
                .$promise
                .then(function(data) {
                  $scope.success('Tool Created.');
                  $scope.$emit('updated_tools');
                  $scope.hideModal();
                }, function(response) {
                  var errors = response.data.errors;
                  angular.forEach(errors, function(error, field) {
                    $scope.error(field + " : " + error);
                  });
                });
            };

            $scope.success = function(message) {
              $scope.alerts.push({type: 'success', msg: message });
            };

            $scope.error   = function(message) {
              $scope.alerts.push({type: 'danger', msg: message });
            };

            $scope.closeAlert = function(index) {
              $scope.alerts.splice(index, 1);
            };

        }],
      };
    }
]);
