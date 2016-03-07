(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryModalCtrl', InventoryModalCtrl);

  InventoryModalCtrl.$inject = [
    '$scope',
    '$timeout',
    'SessionService'
  ];

  function InventoryModalCtrl($scope, $timeout, SessionService) {
    var vm = this;

    vm.user = SessionService.getCurrentUser();

    vm.inventory = {};

    $timeout(function() {
      vm.datetime = $('.datetime').datetimepicker({
        pickTime: false
      });

      vm.datetime.on('dp.change', function(e) {
        $('#deadline').trigger('change');
      });
    });

    vm.close = function() {
      $scope.$emit('close-inventory-modal');
    };

    vm.create = function(model) {
      console.log(model);
      console.log(vm.model);
    }
  }
})();