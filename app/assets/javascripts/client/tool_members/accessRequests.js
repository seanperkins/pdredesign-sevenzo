(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('accessRequests', accessRequests);

  function accessRequests() {
    return {
      restrict: 'E',
      scope: {
        context: '@'
      },
      templateUrl: 'client/tool_members/access_requests.html',
      controller: 'AccessRequestCtrl',
      controllerAs: 'vm'
    };
  }
})();