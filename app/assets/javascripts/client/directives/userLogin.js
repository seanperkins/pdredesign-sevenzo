PDRClient.directive('userLogin', ['SessionService',
    function(SessionService) {
      return {
        restrict: 'E',
        replace: true,
        templateUrl: 'client/views/directives/user_login.html',
        controller: ['$scope', '$rootScope', '$location',
          function($scope, $rootScope, $location) {
            $scope.email    = null;
            $scope.password = null;
            $scope.errors   = null;
            $scope.showalert = false;
            $scope.alerts = [];

            $scope.showError = function() {
              $scope.alerts.push({type: 'danger', msg: 'Invalid email or password!'});
            };

            $scope.closeAlert = function(index) {
              $scope.alerts.splice(index, 1);
            };

            $scope.authenticate = function(email, password) {
              SessionService.authenticate(email, password)
                .then(function(user) {
                  if($scope.redirect)
                    $location.url($scope.redirect);
                  else
                    $location.url('/home');

                  $rootScope.$broadcast('session_updated');
                }, function() {
                  $scope.showError();
                });
            };
          }],
      };
    }
]);
