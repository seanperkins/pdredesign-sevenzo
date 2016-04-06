(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('dataEntry', dataEntry);

  function dataEntry() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/inventories/data_entry.html',
      scope: {
        inventory: '=',
        resource: '='
      },
      controller: 'DataEntryCtrl',
      controllerAs: 'dataEntry'
    }
  }
})();
