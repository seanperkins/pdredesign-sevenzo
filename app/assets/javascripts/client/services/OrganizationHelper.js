PDRClient.service('OrganizationHelper',
  ['$q',
  'Organization',
  function($q, Organization) {
    var scope = this;

    this.searchOrganization = function(querySearch, callback) {
     return Organization.search({query: querySearch})
      .$promise.then(
        function success (data) {
          return callback(data.results);
        },
        function error (response) {
          return response.errors;
        }
      );
    };

}]);
