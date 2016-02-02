PDRClient.controller('ProspectiveUserCtrl', ['$scope', 'ProspectiveUser',
    function($scope, ProspectiveUser) {
      $scope.prospectiveUser = {};
      $scope.errors  = null;
      $scope.success = null;

      $scope.submit = function(prospectiveUser) {
        $scope.errors = null;
        $scope.success = null;

        ProspectiveUser
          .save(prospectiveUser)
          .$promise.then(
            function(data) {
              $scope.success = "Thanks for your interest, we'll be in touch shortly!";
            },
            function(response) {
              $scope.prospectiveUser = {};
              $scope.errors  = response.data.errors;
            }
          );
      };
    }
]);
