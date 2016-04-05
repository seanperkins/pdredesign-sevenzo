(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('productEntry', productEntry);

  function productEntry() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/inventories/product_entry.html',
      scope: {
        inventory: '=',
        resource: '='
      },
      controller: 'ProductEntryCtrl',
      controllerAs: 'productEntry'
    }
  }
})();
