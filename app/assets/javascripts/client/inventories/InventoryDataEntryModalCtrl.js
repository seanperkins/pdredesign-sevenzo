(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryDataEntryModalCtrl', InventoryDataEntryModalCtrl);

  InventoryDataEntryModalCtrl.$inject = [
    '$scope',
    'DataEntry',
    'ConstantsService'
  ];

  function InventoryDataEntryModalCtrl($scope, DataEntry, ConstantsService) {
    var vm = this;

    vm.closeModal = function() {
      $scope.$emit('close-inventory-data-entry-modal');
    };

    vm.constants = ConstantsService.constants;

    vm.inventory = $scope.inventory;

    vm.dataEntry = $scope.resource || {
      general_data_question : {},
      data_entry_question : {},
      data_access_question : {}
    };

    vm.save = function () {
      var dataEntry = angular.copy( vm.dataEntry );

      _.each(['general_data_question',
        'data_entry_question',
        'data_access_question'
      ], function (key) {
        dataEntry[key + '_attributes'] = dataEntry[key];
        delete dataEntry[key];
      });

      DataEntry[dataEntry.id ? 'update' : 'create']({
        inventory_id: vm.inventory.id,
        data_entry_id: dataEntry.id
      }, dataEntry)
          .$promise
          .then(function (dataEntry){
            vm.dataEntry = dataEntry;
            vm.closeModal();
          }, function (response) {
          });
    };
  }
})();
