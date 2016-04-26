(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisModalCtrl', AnalysisModalCtrl);

  AnalysisModalCtrl.$inject = [
    '$scope',
    'Analysis',
    'Inventory'
  ];

  function AnalysisModalCtrl($scope, Analysis, Inventory) {
    var vm = this;
    vm.analysis = {};
    vm.alerts = [];
    vm.preSelectedInventory = $scope.inventory;

    vm.inventories = [];
    vm.hasFetchedInventories = false;

    vm.closeModal = function() {
      $scope.$emit('close-analysis-modal');
    };

    vm.updateData = function () {
      return vm.updateInventories();
    };

    vm.updateInventories = function () {
      return Inventory.query().$promise.then(function (response) {
        vm.inventories = response;

        // ensure a district is always selected
        if (_.any(vm.inventories)) {
          vm.analysis.inventory_id = vm.inventories[0].id;
        }

        vm.hasFetchedInventories = true;
      });
    };

    vm.addAlert = function(message) {
      vm.alerts.push({type: 'danger', msg: message});
    };

    vm.closeAlert = function(index) {
      vm.alerts.splice(index, 1);
    };

    vm.hasInventories = function () {
      return vm.hasFetchedInventories && _.any(vm.inventories);
    };

    vm.hasNoInventories = function () {
      return vm.hasFetchedInventories && _.isEmpty(vm.inventories);
    }

    vm.save = function () {
      Analysis.create(null, vm.analysis)
          .$promise
          .then(function (productEntry){
            vm.closeModal();
          }, function (response) {
            var errors = response.data.errors;
            angular.forEach(errors, function(error, field) {
              vm.addAlert(field + " : " + error);
            });
          });
    };
  }
})();
