PDRClient.directive('chooseRoleModal', ['$modal', '$compile',
    function($modal, $compile) {
      return {
        restrict: 'A',
        scope: {},
        controller: ['$scope', '$modal', function($scope, $modal) {
          $scope.chooseRole  = function() {
            $scope.modalInstance = $modal.open({
              templateUrl: 'client/views/modals/choose_role.html',
              scope: $scope,
              size: 'md'
            });
          };

          $scope.close = function() {
            $scope.modalInstance.dismiss('cancel');
          };
        }],

        compile: function(elm, tAttrs, transclude) {
          elm.removeAttr("choose-role-modal"); // Prevents loop
          elm.attr('ng-click', "chooseRole()");
          return {
            post: function postLink(scope, iElement, iAttrs, controller) {
              $compile(iElement)(scope);
            }
          } 
        },

     };
}]);
