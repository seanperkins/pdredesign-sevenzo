PDRClient.directive('permissionFilter', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/views/assessments/filters/permission-filter.html',
      scope: {
        types: '=',
        selectedPermission: '=',
      },
    };
}]);
