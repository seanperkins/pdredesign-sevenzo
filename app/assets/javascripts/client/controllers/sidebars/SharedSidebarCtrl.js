PDRClient.controller('SharedSidebarCtrl', ['$scope', '$modal', '$stateParams', 'SessionService',
    function($scope, $modal, $stateParams, SessionService) {
      $scope.redirect = $stateParams.redirect;
    }
]);
