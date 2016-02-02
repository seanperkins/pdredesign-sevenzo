PDRClient.directive('statusFilter', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/views/assessments/filters/status-filter.html',
      scope: {
        statuses: '=',
        selectedStatus: '=',
      },
    };
}]);
