PDRClient.directive('categorySelect', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/views/settings/category_select.html',
      scope: {
        organizationId: '=',
        messages: '=',
      },
      controller: [
        '$scope',
        '$timeout',
        'Organization',
        'Category',
        function($scope, $timeout, Organization, Category) {
          $scope.$watch('organizationId', function() {
            if(typeof $scope.organizationId == 'undefined')
              return false;

            $scope.updateCategories($scope.organizationId);
          });

          $scope.loading = false;

          $scope.pushCategories   = function(categories) {
            $scope.loading = true;
            var selectedIds = [];
            angular.forEach(categories, function(category, _index) {
              if(category.selected == true)
                selectedIds.push(category.id);
            });

            Organization
              .save({id: $scope.organizationId}, {category_ids: selectedIds})
              .$promise
              .then(function() {
                $scope.loading = false;
                $scope.messages = {type: 'success', msg: 'Categories updated'};
              });
          };

          $scope.updateCategories = function(id) {
            Organization
              .get({id: id})
              .$promise
              .then(function(organization) {
                return organization.category_ids;
              })
              .then(function(selectedCategories) {
                Category
                  .query()
                  .$promise
                  .then(function(categories) {
                    angular.forEach(categories, function(category, _index){
                      if(selectedCategories.indexOf(category.id)  >= 0)
                        category.selected = true;
                    });

                    $scope.categories = categories;
                    return categories;
                  });
              });

          };


        }]
    };
}]);
