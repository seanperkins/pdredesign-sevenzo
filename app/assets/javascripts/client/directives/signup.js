(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('signup', signup);

  function signup() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        isNetworkPartner: '@',
        isAdministrator: '@'
      },
      templateUrl: 'client/views/directives/signup.html',
      controller: [
        '$scope',
        '$rootScope',
        '$location',
        '$state',
        'User',
        'SessionService',
        function($scope, $rootScope, $location, $state, User, SessionService) {

          $scope.user = {};

          $scope.login = function(user) {
            SessionService.authenticate(user.email, user.password)
                .then(function() {
                  $location.path('/');
                  $rootScope.$broadcast('session_updated');
                });
          };

          $scope.setRole = function(user) {
            if ($scope.isNetworkPartner) {
              user['role'] = 'network_partner';
            }
          };

          $scope.createUser = function(user) {
            $scope.setRole(user);

            $scope.success = null;
            $scope.errors = null;

            User.create(user)
                .$promise
                .then(function() {
                      $scope.success = 'User created';
                      $scope.login(user);
                    }, function(response) {
                      if (response.data && response.data.base) {
                        sessionStorage.setItem('invitation_message', response.data.base);
                        $state.go('invite', {token: response.data.invitation_token});
                        return;
                      }
                      $scope.errors = response.data.errors;
                    }
                );
          };

        }]
    };
  }
})();