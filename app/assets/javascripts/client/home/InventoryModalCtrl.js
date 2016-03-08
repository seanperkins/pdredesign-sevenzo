(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryModalCtrl', InventoryModalCtrl);

  InventoryModalCtrl.$inject = [
    '$scope',
    '$timeout',
    'SessionService',
    'Inventory'
  ];

  function InventoryModalCtrl($scope, $timeout, SessionService, Inventory) {
    var vm = this;

    vm.user = SessionService.getCurrentUser();

    vm.inventory = {};

    $timeout(function() {
      vm.datetime = $('.datetime').datetimepicker({
        pickTime: false,
        minDate: '+1970/01/02'
      });

      vm.datetime.on('dp.change', function(e) {
        $('#deadline').trigger('change');
      });
    });

    vm.close = function() {
      $scope.$emit('close-inventory-modal');
    };

    vm.createInventory = function(model) {
      Inventory.create({inventory: model})
          .$promise
          .then(function(success) {
            console.log(success);
            console.log('ok!');
          }, function(err) {
            console.log(err);
            console.log('not ok!');
          });
    }
  }
})();