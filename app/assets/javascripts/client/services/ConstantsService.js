(function() {
  angular.module('PDRClient')
      .service('ConstantsService', ConstantsService);

  ConstantsService.$inject = [
    '$http'
  ];

  function ConstantsService($http) {
    var constants = {};

    var get = function (collection) {
      return $http.get('/v1/constants/' + collection).success(function (response) {
        constants[collection] = response.constants;
      });
    };

    return {
      get: get,
      constants: constants
    };
  }
})();
