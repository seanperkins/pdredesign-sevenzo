(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ProductEntryListModalCtrl', ProductEntryListModalCtrl);

  ProductEntryListModalCtrl.$inject = [
    '$scope',
    'CheckboxService'
  ];

  function ProductEntryListModalCtrl($scope, CheckboxService) {
    var vm = this;

    vm.selectedProductEntryIds = angular.copy($scope.resource.product_entry_ids);

    console.log("DERP", $scope.productEntries);

    var preparedProductEntries = _.reduce($scope.productEntries, function (result, productEntry) {
      result[productEntry.id] = productEntry.id;
      return result;
    }, {});

    CheckboxService.checkboxize(
      $scope,
      'selectedProductEntries',
      preparedProductEntries,
      vm,
      'selectedProductEntryIds'
    );

    vm.getProductEntryName = function (id) {
      return _.findWhere($scope.productEntries, {id: id}).general_inventory_question.product_name;
    };

    vm.closeModal = function() {
      $scope.$emit('close-product-entry-list-modal');
    };

    vm.save = function () {
      $scope.resource.product_entry_ids = vm.selectedProductEntryIds;
      vm.closeModal();
    };
  }
})();
