(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('avatar', avatar);

  function avatar() {
    return {
      restrict: 'E',
      scope: {
        toolplacement: '@',
        avatar: '@',
        style: '@',
        width: '@',
        imgclass: '@',
        name: '@',
        role: '@',
        tooltip: '@hasTooltip'
      },
      templateUrl: 'client/avatar/avatar_template.html',
      link: function (scope, element) {
        scope.ngWidth = {'width': scope.width};
        scope.title = '<p class="name">' + scope.name + '</p><p class="role">' + scope.role + '</p>';
        scope.elm = element;
      },
      controller: ['$scope', '$timeout',
        function ($scope, $timeout) {
          $timeout(function () {
            if ($scope.tooltip === "true") {
              $scope.elm.find("img").tooltip();
            }
          });
        }]
    };
  }
})();