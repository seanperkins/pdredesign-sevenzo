PDRClient.controller('SettingsCtrl', ['$location', '$anchorScroll', '$scope', '$timeout', 'User', 'SessionService', 'UrlService',
    function($location, $anchorScroll, $scope, $timeout, User, SessionService, UrlService) {

      $scope.user    = null;


      $scope.getUserInfo = function() {
        User.get()
          .$promise
          .then(function(usr) {
            $scope.user = usr;
          });
      };

      $scope.getUserInfo();
      $scope.errors  = null;
      $scope.success = null;

      $scope.isNetworkPartner = function() {
        return SessionService.isNetworkPartner();
      };

      $scope.scrollTop = function() {
        $location.hash("form-top");
        $anchorScroll();
      };

      $scope.updateUser = function(editedUser) {
        editedUser["organization_ids"] = editedUser.organization_ids;

        editedUser
          .$save()
          .then(
            function(data) {
              $scope.success = "Your profile has been updated";
              SessionService.syncUser();
            },
            function(response) {
              $scope.errors  = response.data.errors;
            }
          );
      };

    }
]);
