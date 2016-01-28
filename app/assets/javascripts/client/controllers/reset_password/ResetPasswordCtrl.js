PDRClient.controller('ResetPasswordCtrl', [
  '$scope',
  '$rootScope',
  '$timeout',
  '$resource',
  '$stateParams',
  '$location',
  'UrlService',
  'SessionService',
    function($scope, $rootScope, $timeout, $resource, $stateParams, $location, UrlService, SessionService) {
      $scope.token  = $stateParams.token;
      $scope.alerts = [];

      $scope.success = function(message) {
        $scope.alerts.push({type: 'success', msg: message });
      };

      $scope.error   = function(message) {
        $scope.alerts.push({type: 'danger', msg: message });
      };

      $scope.getErrorFromResponse = function(response_error){
        if( typeof response_error === 'string' ) {
          $scope.error(response_error);
        }else{
          angular.forEach(response_error, function(error, key) {
            angular.forEach(error, function(e) {
              var message = key + ": " + e;
              $scope.error(message);
            });
          });
        }
      };

      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };

      $scope.requestReset = function(email) {
        var Request = $resource(UrlService.url('user/request_reset'));
        Request
          .save({email: email})
          .$promise
          .then(function() {
            $scope.success("Reset email will be sent to the associated account");
          }, function(response){
            $scope.getErrorFromResponse(response.data.errors);
          });
      };

      $scope.syncUser = function(){
        SessionService.syncUser().then(function(usr) {
          $location.path('/');
          $rootScope.$broadcast('session_updated');
        });
      };

      $scope.resetPassword = function(password, password_confirm) {
        if(password != password_confirm) {
          $scope.error("Password confirmation must match password");
          return;
        }

        var Password = $resource(UrlService.url('user/reset'))
        Password
          .save({password: password, token: $scope.token})
          .$promise
          .then(function(){
            $scope.success("Password reset successfully");
            $scope.syncUser();
          }, function(response) {
            $scope.getErrorFromResponse(response.data.errors);
           });
      };

    }
]);
