PDRClient.directive('districtMessage', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'client/views/directives/district_message.html',
      controller: [
        '$scope',
        'DistrictMessage',
        function($scope, DistrictMessage) {
          $scope.message  = {};

          $scope.sendMessage = function(message) {
            $scope.success = null;
            $scope.errors  = null;

            DistrictMessage
              .save(message)
              .$promise
              .then(function(data) {
                  $scope.success = "Thank you!";
                }, function(response) {
                  $scope.errors  = response.data.errors;
                }
              );
          };
        }],
    };
  }
]);
