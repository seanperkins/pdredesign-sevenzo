(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InviteInventoryUserCtrl', InviteInventoryUserCtrl);

  InviteInventoryUserCtrl.$inject = [
    '$scope',
    '$stateParams',
    'InventoryInvitation'
  ];

  function InviteInventoryUserCtrl($scope, $stateParams, InventoryInvitation) {
    var vm = this;

    vm.extractId = function() {
      return $stateParams.inventory_id || $stateParams.id;
    };

    vm.sendInvitation = function(invitation) {
      vm.alerts = [];
      vm.addAlert = function(message) {
        vm.alerts.push({type: 'danger', msg: message});
      };

      vm.closeAlert = function(index) {
        vm.alerts.splice(index, 1);
      };

      vm.shouldSendInvite = function() {
        return $scope.sendInvite === 'true';
      };

      if (vm.shouldSendInvite()) {
        invitation['send_invite'] = true;
      }

      InventoryInvitation.create({inventory_id: vm.extractId()}, invitation)
          .$promise
          .then(function() {
            $scope.$emit('invite-sent');
            $scope.$emit('update_participants');
          })
          .catch(function(response) {
            var errors = response.data.errors;
            angular.forEach(errors, function(error, field) {
              vm.addAlert(field + " : " + error);
            });
          });
    };
  }
})();
