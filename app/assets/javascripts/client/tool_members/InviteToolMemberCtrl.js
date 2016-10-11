(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('InviteToolMemberCtrl', InviteToolMemberCtrl);

  InviteToolMemberCtrl.$inject = [
    '$scope',
    '$rootScope',
    'AlertService',
    'ToolMemberService'
  ];

  function InviteToolMemberCtrl($scope, $rootScope, AlertService, ToolMemberService) {
    var vm = this;

    AlertService.flush();

    vm.alerts = function () {
      return AlertService.getAlerts();
    };

    vm.closeAlert = function (index) {
      AlertService.closeAlert(index);
    };

    vm.sendInvitation = function () {
      vm.inviteUser.send_invite = true;
      ToolMemberService.sendInvitation(vm.inviteUser)
        .then(function () {
          $rootScope.$broadcast('update_participants');
          $scope.closeFn();
        })
        .catch(function (response) {
          angular.forEach(response.data.errors, function (message, field) {
            AlertService.addAlert('danger', field + ' ' + message);
          });
        });
    };
  }
})();