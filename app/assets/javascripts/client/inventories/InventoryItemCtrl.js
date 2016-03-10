(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryItemCtrl', InventoryItemCtrl);

  InventoryItemCtrl.$inject = [
    '$scope'
  ];

  function InventoryItemCtrl($scope) {
    var vm = this;

    $scope.$watch('element', function(val) {
      vm.element = val;
    }).bind(vm);
  }
})();
