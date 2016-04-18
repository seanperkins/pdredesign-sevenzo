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

    vm.closeModal = function() {
      $scope.$emit('close-analysis-modal');
    };

    vm.updateData = function () {
      return vm.updateInventories();
    };

    vm.updateInventories = function () {
      return Inventory.query().$promise.then(function (response) {
        vm.inventories = response.inventories;

        // ensure a district is always selected
        vm.analysis.inventory_id = vm.inventories[0].id;
      });
    };


    vm.analysis = {};

    vm.save = function () {
      Analysis.create(null, vm.analysis)
          .$promise
          .then(function (productEntry){
            vm.closeModal();
          }, function (response) {
          });
    };
  }
})();
