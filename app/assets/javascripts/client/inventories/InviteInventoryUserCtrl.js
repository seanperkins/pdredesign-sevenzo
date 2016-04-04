(function() {
  'use strict';

  angular.module('PDRClient').controller('InviteInventoryUserCtrl', InviteInventoryUserCtrl);

  InviteInventoryUserCtrl.$inject = ['$scope', 'InventoryInvitation'];
  function InviteInventoryUserCtrl($scope, InventoryInvitation) {
    var vm = this;
    vm.sendInvitation = function(invitation) {
      vm.alerts  = [];
      vm.addAlert = function(message) {
        vm.alerts.push({type: 'danger', msg: message});
      };

      vm.closeAlert = function(index) {
        vm.alerts.splice(index, 1);
      };
      InventoryInvitation.create({ inventory_id: $scope.inventoryId }, invitation).$promise.then(function(response) {
        $scope.$emit('invite-sent');
      }).catch(function(response) {
        var errors = response.data.errors;
        angular.forEach(errors, function(error, field) {
          vm.addAlert(field + " : " + error);
        });
      });
    };
  }
})();
