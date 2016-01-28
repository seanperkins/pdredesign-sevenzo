PDRClient.service('CategoryHelper',
  ['$q',
  'Category',
  'Organization',

  function($q, Category, Organization) {
    var scope = this;

    this.saveOrganizationCategories = function(editedOrganization) {
      return editedOrganization
        .$save({id: editedOrganization.id})
        .then(
          function(data) {
            return data;
          },
          function(response) {
            return response.data.errors;
          }
        );
    };

}]);
