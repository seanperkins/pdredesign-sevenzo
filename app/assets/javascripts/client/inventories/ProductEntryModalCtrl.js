(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ProductEntryModalCtrl', ProductEntryModalCtrl);

  ProductEntryModalCtrl.$inject = [
    '$scope',
    'ProductEntry',
    'ConstantsService',
    'CheckboxService',
    'Inventory'
  ];

  function ProductEntryModalCtrl($scope, ProductEntry, ConstantsService, CheckboxService, Inventory) {
    var vm = this;

    vm.closeModal = function() {
      $scope.$emit('close-product-entry-modal');
    };

    vm.updateData = function () {
      return vm.updateConstants();
    };

    vm.updateConstants = function () {
      return ConstantsService.get('product_entry')
          .then(function () { vm.constants = ConstantsService.constants; });
    };

    vm.inventory = $scope.inventory;

    vm.productEntry = $scope.resource || {
      general_inventory_question : {},
      product_question : {},
      usage_question : {},
      technical_question : {}
    };

    vm.setupCheckboxes = function () {
      CheckboxService.checkboxize(
        $scope,
        'selectedProductTypes',
        vm.constants.product_entry.general_inventory_question.product_types,
        vm.productEntry.general_inventory_question,
        'data_type'
      );
      CheckboxService.checkboxize(
        $scope,
        'selectedAssignmentApproaches',
        vm.constants.product_entry.product_question.assignment_approaches,
        vm.productEntry.product_question,
        'how_its_assigned'
      );
      CheckboxService.checkboxize(
        $scope,
        'selectedUsageFrequencies',
        vm.constants.product_entry.product_question.usage_frequencies,
        vm.productEntry.product_question,
        'how_its_used'
      );
      CheckboxService.checkboxize(
        $scope,
        'selectedAccesses',
        vm.constants.product_entry.product_question.accesses,
        vm.productEntry.product_question,
        'how_its_accessed'
      );
      CheckboxService.checkboxize(
        $scope,
        'selectedAudienceTypes',
        vm.constants.product_entry.product_question.audience_types,
        vm.productEntry.product_question,
        'audience'
      );
      CheckboxService.checkboxize(
        $scope,
        'selectedPlatformOptions',
        vm.constants.product_entry.technical_question.platform_options,
        vm.productEntry.technical_question,
        'platforms'
      );

      Inventory.productEntries({inventory_id: vm.inventory.id})
          .$promise.then(function (response) {
            vm.productEntries = response.product_entries;

            var options = _.reduce(response.product_entries, function (result, productEntry) {
              result[productEntry.id] = productEntry.id;
              return result;
            }, {});

            CheckboxService.checkboxize(
              $scope,
              'selectedConnectedProductEntries',
              options,
              vm.productEntry.technical_question,
              'connectivity'
            );
          });
    };

    vm.getProductEntryName = function (id) {
      return _.findWhere(vm.productEntries, {id: id}).general_inventory_question.product_name;
    };

    vm.save = function () {
      var productEntry = angular.copy( vm.productEntry );

      _.each(['general_inventory_question',
        'product_question',
        'usage_question',
        'technical_question'
      ], function (key) {
        productEntry[key + '_attributes'] = productEntry[key];
        delete productEntry[key];
      });

      ProductEntry[productEntry.id ? 'update' : 'create']({
        inventory_id: vm.inventory.id,
        product_entry_id: productEntry.id
      }, productEntry)
          .$promise
          .then(function (productEntry){
            vm.productEntry = productEntry;
            vm.closeModal();
          }, function (response) {
          });
    };
  }
})();
