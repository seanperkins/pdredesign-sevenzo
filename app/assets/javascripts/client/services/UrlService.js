PDRClient.factory('UrlService', [function() {

  var basePath = '/v1/';
  var service = {};

  service.url = function(path) {
    return basePath + path;
  };

  return service;
}]);

