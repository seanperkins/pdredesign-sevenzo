PDRClient.factory('InventoryParticipant', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/participants'), null,{
      create: {
        method: 'POST'
      }
    });
}]);
