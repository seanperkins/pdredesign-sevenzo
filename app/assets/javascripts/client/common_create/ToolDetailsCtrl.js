(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ToolDetailsCtrl', ToolDetailsCtrl);

  ToolDetailsCtrl.$inject = [
    '$scope',
    'SessionService',
    'CreateService'
  ];

  function ToolDetailsCtrl($scope, SessionService, CreateService) {
    var vm = this;

    vm.saving = false;
    vm.user = SessionService.getCurrentUser();
    vm.district = vm.user.districts[0];

    vm.defaultDate = function(model) {
      if (typeof(model) !== 'undefined') {
        return moment(model.due_date || model.deadline).format('MM/DD/YYYY');
      }
    };

    vm.save = function(entity) {
      CreateService.loadDistrict(vm.district);
      CreateService.saveAssessment(entity);
    };

    vm.formattedDate = function(date) {
      return CreateService.formattedDate(date);
    };

    CreateService.loadScope($scope);

    $scope.$on('toggle-saving-state', function() {
      vm.saving = !vm.saving;
    });

    $scope.$watch('model', function(val) {
      vm.date = vm.defaultDate(val);
    }).bind(vm);
  }
})();