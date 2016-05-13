(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('productEntryListLink', productEntryListLink);

  function productEntryListLink() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/inventories/product_entry_list_link.html',
      scope: {
        productEntries: '=',
        resource: '='
      },
      controller: 'ProductEntryListLinkCtrl',
      controllerAs: 'productEntryListLink'
    }
  }
})();
