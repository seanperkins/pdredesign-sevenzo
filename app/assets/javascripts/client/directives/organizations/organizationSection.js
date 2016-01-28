PDRClient.directive('organizationSection', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      templateUrl: 'client/views/settings/organization_section.html',
      scope: {
        organizationId: '=',
      },
      controller: [
        '$scope',
        '$timeout',
        'SessionService',
        'Organization',
        function($scope, $timeout, SessionService, Organization) {
          $scope.alertorganization = {};

          $scope.closeAlert = function() {
            $scope.alertorganization.type = '';
          };

          $scope.isNetworkPartner = function() {
            return SessionService.isNetworkPartner();
          };
        }]
    };
}]);
