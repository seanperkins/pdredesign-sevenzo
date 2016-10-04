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
  }
})();