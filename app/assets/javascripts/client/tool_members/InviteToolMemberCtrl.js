(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('InviteToolMemberCtrl', InviteToolMemberCtrl);

  InviteToolMemberCtrl.$inject = [
    'AlertService',
    'ToolMemberService'
  ];

  function InviteToolMemberCtrl(AlertService, ToolMemberService) {
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
        .then(function (result) {

        })
        .catch(function (response) {
          angular.forEach(response.data.errors, function (message, field) {
            AlertService.addAlert('danger', field + ' ' + message);
          });
        });
    };
  }
})();