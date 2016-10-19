(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('responseStatus', responseStatus);

  function responseStatus() {
    return {
      restrict: 'E',
      scope: {
        user: "="
      },
      templateUrl: 'client/tool_members/response_status.html',
      controller: 'ResponseStatusCtrl',
      controllerAs: 'vm'
    };
  }
})();