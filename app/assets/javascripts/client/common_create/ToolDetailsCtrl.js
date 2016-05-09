(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ToolDetailsCtrl', ToolDetailsCtrl);

  ToolDetailsCtrl.$inject = [
    '$scope',
    'SessionService',
    'CreateService',
    'Inventory'
  ];

  function ToolDetailsCtrl($scope, SessionService, CreateService, Inventory) {
    var vm = this;

    vm.saving = false;
    vm.user = SessionService.getCurrentUser();
    if(vm.user) {
      vm.district = vm.user.districts[0];
    }

    if ($scope.showInventory) {
      Inventory.get({inventory_id: $scope.model.inventory_id}).$promise.then(function (inventory) {
        vm.inventory = inventory;
      });
    }

    vm.defaultDate = function(model) {
      if (typeof(model) !== 'undefined') {
        return moment(model.due_date || model.deadline).format('MM/DD/YYYY');
      }
    };

    vm.determineDistrict = function(model) {
      if (typeof(model) !== 'undefined') {
        angular.forEach(vm.user.districts, function(district) {
          if (model.district_id === district.id) {
            vm.district = district;
          }
        });
      }
    };

    vm.save = function(entity) {
      CreateService.loadDistrict(vm.district);
      CreateService.save(entity);
    };

    vm.formattedDate = function(date) {
      return CreateService.formattedDate(date);
    };

    CreateService.loadScope($scope);

    $scope.$on('toggle-saving-state', function() {
      vm.saving = !vm.saving;
    });

    $scope.$watch('model', function(val) {
      vm.determineDistrict(val);
      vm.date = vm.defaultDate(val);
    }).bind(vm);
  }
})();