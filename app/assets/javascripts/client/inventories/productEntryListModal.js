(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('productEntryListModal', productEntryListModal);

  function productEntryListModal() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        productEntries: '=',
        resource: '='
      },
      templateUrl: 'client/inventories/product_entry_list_modal.html',
      controller: 'ProductEntryListModalCtrl',
      controllerAs: 'productEntryListModal'
    }
  }
})();
