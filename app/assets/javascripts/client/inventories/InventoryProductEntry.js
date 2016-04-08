PDRClient.factory('InventoryProductEntry', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/product_entries'), null, {});
}]);
