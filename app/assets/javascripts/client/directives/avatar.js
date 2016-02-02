PDRClient.directive('avatar', [
  function() {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      toolplacement: '@',
      avatar:        '@',
      style:         '@',
      width:         '@',
      imgclass:      '@',
      name:          '@',
      role:          '@',
      tooltip:       '@hasTooltip'
    },
    templateUrl: 'client/views/directives/avatar.html',
    link: function(scope, elm, attrs) {
      scope.ngWidth = {'width': scope.width};
      scope.title  = "<p class='name'>" + scope.name + "</p><p class='role'>" + scope.role + "</p>";
      scope.elm    = elm;
    },
    controller: ['$scope', '$rootScope', '$location', '$timeout',
      function($scope, $rootScope, $location, $timeout) {
        $timeout(function() {
          if ($scope.tooltip == "true") {
            $scope.elm.find("img").tooltip();
          }
        });
      }],
  };
}
]);
