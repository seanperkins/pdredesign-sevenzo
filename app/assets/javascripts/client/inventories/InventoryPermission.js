(function() {
  'use strict';

  angular.module('PDRClient').factory('InventoryPermission', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/permissions'), null,{
      list: {
        method: 'GET',
        isArray: true
      }
    });
  }]);
})();
