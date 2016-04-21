(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ManageAnalysisPermissionsLinkCtrl', ManageAnalysisPermissionsLinkCtrl);

  ManageAnalysisPermissionsLinkCtrl.$inject = [
    '$modal',
    '$scope'
  ];

  function ManageAnalysisPermissionsLinkCtrl($modal, $scope) {
    var vm = this;
    vm.open = function() {
      vm.modal = $modal.open({
        templateUrl: 'client/inventories/manage_analysis_permissions_modal.html',
        scope: $scope,
        size: 'lg',
        windowClass: 'request-access-window'
      });
    };

    vm.close = function() {
      vm.modal.dismiss();
    };

    vm.save = function() {
      $scope.$broadcast("save");
    };

    $scope.$on('close-modal', function() {
      vm.close();
    });
  }
})();
