PDRClient.directive('userHeader', ['SessionService',
    function(SessionService) {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'client/views/directives/user_header.html',
        link: function(scope, elm, attrs) {
          scope.user      = SessionService.getCurrentUser();
          scope.firstName = scope.user.first_name;
        }
      };
    }
]);
