(function() {
  'use strict';

  angular.module('PDRClient').controller('InviteInventoryUserCtrl', InviteInventoryUserCtrl);

  InviteInventoryUserCtrl.$inject = ['$scope', 'InventoryInvitation'];
  function InviteInventoryUserCtrl($scope, InventoryInvitation) {
    var vm = this;
    vm.sendInvitation = function(invitation) {
      $scope.alerts  = [];
      $scope.addAlert = function(message) {
        $scope.alerts.push({type: 'danger', msg: message});
      };

      $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
      };
      InventoryInvitation.create({ inventory_id: $scope.inventoryId }, invitation).$promise.then(function(response) {
        var errors = response.data.errors;
        $scope.$emit('invite-sent');
      }).catch(function(response) {
        var errors = response.data.errors;
        angular.forEach(errors, function(error, field) {
          $scope.addAlert(field + " : " + error);
        });
      });
    };
  }
})();
