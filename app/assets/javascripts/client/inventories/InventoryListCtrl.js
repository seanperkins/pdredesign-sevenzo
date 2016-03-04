(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('InventoryListCtrl', InventoryListCtrl);

  InventoryListCtrl.$inject = [
    '$scope'
  ];

  function InventoryListCtrl($scope) {
    var vm = this;

    $scope.$watch('inventories', function(val) {
      vm.inventories = val.inventories;
    }).bind(vm);
  }
})();