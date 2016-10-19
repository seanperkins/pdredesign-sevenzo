(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('AccessRequestCtrl', AccessRequestCtrl);

  AccessRequestCtrl.$inject = [
    '$scope',
    '$window',
    'ToolMemberService'
  ];

  function AccessRequestCtrl($scope, $window, ToolMemberService) {
    var vm = this;

    ToolMemberService.setContext($scope.context);

    vm.loadList = function () {
      return ToolMemberService.loadPermissionRequests();
    };

    vm.denyRequest = function (request_id) {
      if ($window.confirm('Are you sure you want to deny this access request?')) {
        ToolMemberService.denyRequest(request_id)
          .then(function () {
            vm.list = vm.loadList();
          });
      }
    };

    vm.grantRequest = function (request_id) {
      if ($window.confirm('Are you sure you want to accept this access request?')) {
        ToolMemberService.grantRequest(request_id)
          .then(function (newMember) {
            ToolMemberService.createParticipant(newMember.user, newMember.user.roles)
              .then(function () {
                vm.list = vm.loadList();
              });
          });
      }
    };

    vm.list = vm.loadList();
  }
})();