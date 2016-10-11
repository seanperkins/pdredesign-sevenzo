(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('AddUsersLinkCtrl', AddUsersLinkCtrl);

  AddUsersLinkCtrl.$inject = [
    '$modal',
    '$scope'
  ];

  function AddUsersLinkCtrl($modal, $scope) {
    var vm = this;

    vm.open = function () {
      vm.modal = $modal.open({
        templateUrl: 'client/tool_members/modals/add_members_modal.html',
        scope: $scope,
        windowClass: 'request-access-window',
        size: 'lg'
      });
    };

    vm.close = function () {
      vm.modal.dismiss();
    };

    $scope.$on('close-add-participants', function () {
      vm.close();
    });
  }
})();