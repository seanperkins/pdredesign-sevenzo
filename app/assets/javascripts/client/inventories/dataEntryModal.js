(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('dataEntryModal', dataEntryModal);

  function dataEntryModal() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        inventory: '=',
        resource: '='
      },
      templateUrl: 'client/inventories/data_entry_modal.html',
      controller: 'DataEntryModalCtrl',
      controllerAs: 'dataEntryModal'
    }
  }
})();
