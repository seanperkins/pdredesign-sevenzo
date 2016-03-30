(function() {
  'use strict';

  angular.module('PDRClient').factory('InventoryInvitation', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/invitations'), null,{
      create: {
        method: 'POST',
      }
    });
  }]);
})();
