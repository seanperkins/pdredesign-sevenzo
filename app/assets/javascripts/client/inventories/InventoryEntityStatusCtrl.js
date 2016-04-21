(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryEntityStatusCtrl', InventoryEntityStatusCtrl);

  function InventoryEntityStatusCtrl() {
    var vm = this;

    vm.completedInventoryIcon = function(entity) {
      if (entity.consensus && entity.consensus.is_completed) {
        return 'fa-check';
      } else {
        return 'fa-spinner';
      }
    };

    vm.draftStatusIcon = function(entity) {
      if (entity.has_access) {
        return 'fa-eye';
      } else {
        return 'fa-minus-circle';
      }
    };

    vm.roundNumber = function(number) {
      return Math.floor(number);
    };
  }
})();