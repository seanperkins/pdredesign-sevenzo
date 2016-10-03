(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('AddUsersLinkCtrl', AddUsersLinkCtrl);

  AddUsersLinkCtrl.$inject = [
    '$modal',
    '$scope',
    'ToolMemberService'
  ];

  function AddUsersLinkCtrl($modal, $scope, ToolMemberService) {
    var vm = this;

    vm.open = function () {
      switch($scope.context) {
        case 'inventory':
          vm.inventoryModal = $modal.open({
            templateUrl: 'client/tool_members/modals/add_members_modal.html',
            scope: $scope,
            windowClass: 'request-access-window',
            size: 'lg'
          });
      }
    };

    vm.close = function() {
      vm.modal.dismiss();
    };

    $scope.$on('close-add-participants', function() {
      vm.close();
    });
  }
})();