(function() {
  'use strict';
  angular.module('PDRClient').factory('InventoryInvitation', InventoryInvitation);
  InventoryInvitation.$inject = ['$resource', 'UrlService'];

  function InventoryInvitation($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/invitations'), null,{
      create: {
        method: 'POST',
      }
    });
  }
})();
