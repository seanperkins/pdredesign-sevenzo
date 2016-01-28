PDRClient.controller('NavigationCtrl', ['$scope', '$rootScope', 'SessionService', '$location', '$modal',
    function($rootScope, $scope, SessionService, $location, $modal) {
      $scope.updateTemplate = function() {
        SessionService.setUserTemplate(
          $scope,
          'client/views/navigation/navigation_user.html',
          'client/views/navigation/navigation_anon.html'
        );
      };
      $scope.updateTemplate();
      $scope.user = SessionService.getCurrentUser();

      $scope.currentLocation = '';
      $scope.activeClassFor = function(location) {
        if($scope.currentLocation == location)
          return 'active';
        return '';
      };
      
      $scope.$watch(function () { return $location.url(); }, function (url) {
        switch(url) {
          case '/assessments':
            return $scope.currentLocation = "current_state";
          case '':
            return $scope.currentLocation = "home";
          case '/':
            return $scope.currentLocation = "home";
          case '/login':
            return $scope.currentLocation = "login";
          case '/administrators':
            return $scope.currentLocation = "administrators";
          case '/educators':
            return $scope.currentLocation = "educators";
            case '/networks':
            return $scope.currentLocation = "networks";
          default:
            return '';
        }
      });

      $scope.$on('session_updated', function() {
        SessionService.syncUser();
        $scope.user = SessionService.getCurrentUser();
        $scope.updateTemplate();
      });
    }
]);
