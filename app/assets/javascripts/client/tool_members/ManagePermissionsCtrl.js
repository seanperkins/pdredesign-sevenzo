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

    vm.determineRoles = function (element) {
      var roles = [];
      if (element.is_facilitator) {
        roles.push(0);
      }

      if (element.is_participant) {
        roles.push(1);
      }

      return roles;
    };

    vm.save = function () {
      angular.forEach(vm.list, function (member) {
        if (member.is_facilitator || member.is_participant) {
          var updatableMember = {
            user_id: member.user_id,
            roles: vm.determineRoles(member)
          };
          ToolMemberService.updatePermissions(updatableMember).then(function (response) {

          }).catch(function (err) {

          });
        } else {
          var deletableMember = {
            id: member.id
          };

          ToolMemberService.removeMember(deletableMember).then(function (response) {
            console.log(response);
          }).catch(function(err) {
            console.log(err);
          });
        }
      });
    };
  }
})();