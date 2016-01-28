PDRClient.directive('faqs', [
  '$timeout',
  '$state',
  'FAQ',
  function($timeout, $state, FAQ) {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      selectedTopic: '@topic',
      selectedRole: '@role',
    },
    templateUrl: 'client/views/directives/faqs.html',
    link: function(scope, elm, attrs) {
      scope.categories = [];

      scope.updatedSelection = function() {
        $state.transitionTo('faqs', {
          topic: scope.selectedTopic,
          role:  scope.selectedRole
        });
      };

      scope.updateFAQs = function() {
        return FAQ.query(function(data) {
          return scope.categories = data;
        }).$promise;
      };

      scope.toggleQuestion = function(target) {
        return target.visible = !target.visible;
      };

      scope.uniq_faq_property = function(target, field) {
        var uniq = [];
        angular.forEach(target, function(category){
          angular.forEach(category.questions, function(question){
            uniq.push(question[field]);
          });
        });

        return _.uniq(_.flatten(uniq));
      };

      scope.topics = function() {
        return scope.uniq_faq_property(scope.categories, 'topic');
      };

      scope.roles = function() {
        return scope.uniq_faq_property(scope.categories, 'role');
      };

      $timeout(function() {
        scope.updateFAQs();
      });

    },
  };
}
]);

PDRClient.filter('propertyFilter', function() {
  return function( items, property, value) {
    var filtered = [];
    angular.forEach(items, function(item) {
      if(!value || item[property]== value) filtered.push(item);
    });
    return filtered;
  };
});
