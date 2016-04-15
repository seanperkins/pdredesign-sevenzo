(function() {
  angular.module('PDRClient')
      .factory('Analysis', Analysis);

  Analysis.$inject = [
    '$resource',
    'UrlService'
  ];

  function Analysis($resource, UrlService) {
    var methodOptions = {
      method: 'POST'
    };

    return $resource(UrlService.url('inventories/:inventory_id/product_entries/:product_entry_id'), null, methodOptions);
  }
})();
