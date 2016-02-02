PDRClient.directive('myTabs', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      tabTitle: '@'
    },
    controller: function($scope) {
      var panes = $scope.panes = [];

      $scope.select = function(pane) {
        angular.forEach(panes, function(pane) {
          pane.selected = false;
        });
        pane.selected = true;
      };

      this.addPane = function(pane) {
        if (panes.length === 0) {
          $scope.select(pane);
        }
        panes.push(pane);
      };
    },
    templateUrl: 'client/views/directives/assessment_permission_tabs.html'
  };
})
.directive('myPane', function() {
  return {
    require: '^myTabs',
    restrict: 'E',
    transclude: true,
    scope: {
      title: '@',
      badge: '@'
    },
    link: function(scope, element, attrs, tabsCtrl) {
      tabsCtrl.addPane(scope);
    },
    templateUrl: 'client/views/directives/assessment_permission_pane.html'
  };
});
