(function () {
  'use strict';

  angular.module('PDRClient')
      .controller('SidebarCtrl', SidebarCtrl);

  SidebarCtrl.$inject = [
    '$scope',
    '$modal',
    '$stateParams',
    'SessionService'
  ];

  function SidebarCtrl($scope, $mmodal, $stateParams, SessionService) {
    $scope.user     = SessionService.getCurrentUser();
    $scope.redirect = $stateParams.redirect;

    if($scope.user) {
      $scope.visible = true;
      $scope.name   = $scope.user["full_name"];
      $scope.avatar = $scope.user["avatar"];
      $scope.role   = $scope.user["role_human"];
    }
  }
})();
