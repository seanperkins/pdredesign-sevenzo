(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryDataEntryListModalCtrl', InventoryDataEntryListModalCtrl);

  InventoryDataEntryListModalCtrl.$inject = [
    '$scope',
    'CheckboxService'
  ];

  function InventoryDataEntryListModalCtrl($scope, CheckboxService) {
    var vm = this;

    vm.selectedDataEntryIds = angular.copy($scope.resource.data_entry_ids);

    var preparedDataEntries = _.reduce($scope.inventoryDataEntries, function (result, dataEntry) {
      result[dataEntry.id] = dataEntry.id;
      return result;
    }, {});

    CheckboxService.checkboxize(
      $scope,
      'selectedDataEntries',
      preparedDataEntries,
      vm,
      'selectedDataEntryIds'
    );

    vm.getDataEntryName = function (id) {
      return _.findWhere($scope.inventoryDataEntries, {id: id}).name;
    };

    vm.closeModal = function() {
      $scope.$emit('close-inventory-data-entry-list-modal');
    };

    vm.save = function () {
      $scope.resource.data_entry_ids = vm.selectedDataEntryIds;
      vm.closeModal();
    };
  }
})();
