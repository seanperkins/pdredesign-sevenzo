(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ProductEntryModalCtrl', ProductEntryModalCtrl);

  ProductEntryModalCtrl.$inject = [
    '$scope',
    'ProductEntry',
    'Enums'
  ];

  function ProductEntryModalCtrl($scope, ProductEntry, Enums) {
    var vm = this;

    vm.closeModal = function() {
      $scope.$emit('close-product-entry-modal');
    };

    vm.enums = Enums;

    vm.inventory = $scope.inventory;

    vm.productEntry = $scope.resource || {
      general_inventory_question : {},
      product_question : {},
      usage_question : {},
      technical_question : {}
    };

    var checkboxize = function (scopeKey, options, property, key) {
      var productEntryProperty = vm.productEntry;

      $scope[scopeKey] = _.map(options, function (value) {
        var selected = _.include( property[key], value);
        return {name : value, selected: selected};
      });

      $scope.$watch( scopeKey, function (newValue) {
        var selectedValues = _.pluck(_.filter(newValue, {selected: true}), "name");
        property[key] = selectedValues;
      }, true);
    };

    checkboxize(
      "selectedProductTypes",
      Enums.models.ProductEntry.GeneralInventoryQuestion.productTypes,
      vm.productEntry.general_inventory_question,
      "data_type"
    );
    checkboxize(
      "selectedAssignmentApproaches",
      Enums.models.ProductEntry.ProductQuestion.assignmentApproaches,
      vm.productEntry.product_question,
      "how_its_assigned"
    );
    checkboxize(
      "selectedUsageFrequencies",
      Enums.models.ProductEntry.ProductQuestion.usageFrequencies,
      vm.productEntry.product_question,
      "how_its_used"
    );
    checkboxize(
      "selectedAccesses",
      Enums.models.ProductEntry.ProductQuestion.accesses,
      vm.productEntry.product_question,
      "how_its_accessed"
    );
    checkboxize(
      "selectedAudienceTypes",
      Enums.models.ProductEntry.ProductQuestion.audienceTypes,
      vm.productEntry.product_question,
      "audience"
    );
    checkboxize(
      "selectedPlatformOptions",
      Enums.models.ProductEntry.TechnicalQuestion.platformOptions,
      vm.productEntry.technical_question,
      "platforms"
    );

    vm.save = function () {
      var productEntry = angular.copy( vm.productEntry );
      console.log(productEntry);

      _.each(['general_inventory_question',
        'product_question',
        'usage_question',
        'technical_question'
      ], function (key) {
        productEntry[key + '_attributes'] = productEntry[key];
        delete productEntry[key];
      });

      ProductEntry[productEntry.id ? "update" : "create"]({
        inventory_id: vm.inventory.id,
        product_entry_id: productEntry.id
      }, productEntry)
          .$promise
          .then(function (productEntry){
            vm.productEntry = productEntry;
            vm.closeModal();
            console.log("success");
          }, function (response) {
            console.log(response);
          });
    };
  }
})();
