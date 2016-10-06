(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('ManagePermissionsCtrl', ManagePermissionsCtrl);

  ManagePermissionsCtrl.$inject = [
    'ToolMemberService'
  ];

  function ManagePermissionsCtrl(ToolMemberService) {
    var vm = this;

    vm.loadMembers = function () {
      return ToolMemberService.loadAllMembers();
    };

    vm.list = vm.loadMembers();

    vm.save = function () {
      var membersToUpdate = [],
        membersToDelete = [];
      angular.forEach(vm.list, function (element) {
        if (element.is_facilitator || element.is_participant) {
          membersToUpdate.push({
            id: element.id,
            is_facilitator: element.is_facilitator,
            is_participant: element.is_participant
          });
        } else {
          membersToDelete.push({
            id: element.id
          });
        }
      });
      ToolMemberService.batchUpdate(membersToUpdate).then(function () {
        console.log('wait, what??');
      }).catch(function (err) {
        console.log(err);
        console.log('okay');
      });
    };
  }
})();