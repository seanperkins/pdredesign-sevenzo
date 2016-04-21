(function() {
  angular.module('PDRClient')
      .factory('Analysis', Analysis);

  Analysis.$inject = [
    '$resource',
    'UrlService'
  ];

  function Analysis($resource, UrlService) {
    var paramDefaults = {
      inventory_id: '@inventory_id'
    };

    var methodOptions = {
      'create': {
        method: 'POST'
      }
    };

    return $resource(UrlService.url('inventories/:inventory_id/analyses'), paramDefaults, methodOptions);
  }
})();
