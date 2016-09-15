(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('RedeemInvitationCtrl', RedeemInvitationCtrl);

  RedeemInvitationCtrl.$inject = [
    '$scope',
    '$state',
    '$rootScope',
    'InvitationService',
    'SessionService'
  ];

  function RedeemInvitationCtrl($scope, $state, $rootScope, InvitationService, SessionService) {
    var vm = this;

    vm.invitedUser = InvitationService.getInvitedUser($scope.token);
    vm.alerts = [];

    vm.showError = function (msg) {
      vm.alerts.push({type: 'danger', msg: msg});
    };

    vm.closeAlert = function (index) {
      vm.alerts.splice(index, 1);
    };

    vm.populateErrors = function (errors) {
      angular.forEach(errors, function (error, key) {
        angular.forEach(error, function (e) {
          var message = key + ": " + e;
          vm.showError(message);
        });
      });
    };

    vm.redeemInvite = function () {
      InvitationService.saveInvitation($scope.token, vm.invitedUser)
        .then(function () {
          SessionService.authenticate(vm.invitedUser.email, vm.invitedUser.password)
            .then(function () {
              $rootScope.$broadcast('session_updated');
              SessionService.syncUser().then(function () {
                if (vm.invitedUser.analysis_id) {
                  $state.go('inventory_analysis_dashboard', {
                    inventory_id: vm.invitedUser.inventory_id,
                    id: vm.invitedUser.analysis_id
                  });
                } else if (vm.invitedUser.inventory_id) {
                  $state.go('inventories_report', {inventory_id: vm.invitedUser.inventory_id});
                } else if (vm.invitedUser.assessment_id) {
                  $state.go('response_create', {assessment_id: vm.invitedUser.assessment_id});
                } else {
                  vm.populateErrors([{redirect: 'No path to redirect to.  Be sure the tool is supported.'}]);
                }
              });
            });
        }, function (response) {
          vm.populateErrors(response.data.errors)
        });
    };
  }
})();
