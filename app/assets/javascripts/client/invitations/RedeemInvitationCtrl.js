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
    var invitationMessage = sessionStorage.getItem('invitationMessage');

    vm.invitedUser = InvitationService.getInvitedUser($scope.token);
    vm.isError = null;
    vm.errors = null;
    vm.showalert = false;
    vm.alerts = [];

    if (invitationMessage) {
      vm.alerts.push({type: 'info', msg: invitationMessage});
      sessionStorage.removeItem('invitationMessage');
    }

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
                if (vm.invitedUser.inventory_id) {
                  $state.go('inventories_report', {inventory_id: vm.invitedUser.inventory_id});
                } else if (vm.invitedUser.analysis_id) {
                  $state.go('inventory_analysis_dashboard', {
                    inventory_id: vm.invitedUser.inventory_id,
                    id: vm.invitedUser.analysis_id
                  });
                } else {
                  $state.go('response_create', {assessment_id: vm.invitedUser.assessment_id});
                }
              });
            });
        }, function (response) {
          vm.populateErrors(response.data.errors)
        });
    };
  }
})();
