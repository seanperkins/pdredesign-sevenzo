(function () {
  'use strict';
  angular.module('PDRClient')
      .directive('addAnalysisUsers', addAnalysisUsers);

  function addAnalysisUsers() {
    return {
      restrict: 'E',
      scope: {
        inventoryId: '=analysisId'
      },
      templateUrl: 'client/inventories/add_analysis_users.html',
      controller: 'AddAnalysisUsersCtrl',
      controllerAs: 'addAnalysisUsers',
      replace: true
    }
  }
})();
