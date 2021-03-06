(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('productEntryModal', productEntryModal);

  function productEntryModal() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        inventory: '=',
        resource: '='
      },
      templateUrl: 'client/inventories/product_entry_modal.html',
      controller: 'ProductEntryModalCtrl',
      controllerAs: 'productEntryModal',
      link: productEntryModalLink
    }
  }

  function productEntryModalLink (scope, element, attributes, controller) {
    controller.updateData().then(controller.setupCheckboxes);
  }
})();
