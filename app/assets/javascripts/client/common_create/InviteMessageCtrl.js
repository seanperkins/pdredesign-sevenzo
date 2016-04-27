(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InviteMessageCtrl', InviteMessageCtrl);

  InviteMessageCtrl.$inject = [
    '$scope',
    'SessionService',
    'CreateService'
  ];

  function InviteMessageCtrl($scope, SessionService, CreateService) {
    var vm = this;

    vm.user = SessionService.getCurrentUser();
    vm.saving = false;

    vm.save = function(entity, assign) {
      if(CreateService.context === 'assessment') {
        CreateService.saveAssessment(entity, assign);
      } else if(CreateService.context === 'inventory') {
        CreateService.saveInventory(entity, assign);
      } else if(CreateService.context === 'analysis') {
        CreateService.saveAnalysis(entity, assign);
      }
    };

    vm.assignAndSave = function(entity) {
      if(CreateService.context === 'assessment') {
        CreateService.assignAndSaveAssessment(entity);
      } else if(CreateService.context === 'inventory') {
        CreateService.assignAndSaveInventory(entity);
      } else if(CreateService.context === 'analysis') {
        CreateService.assignAndSaveAnalysis(entity);
      }
    };

    vm.getToolName = function() {
      if (CreateService.context === 'assessment') {
        return 'assessment';
      } else if (CreateService.context === 'inventory') {
        return 'inventory';
      } else if (CreateService.context === 'analysis') {
        return 'analysis';
      }
    };

    vm.formattedDate = function(date) {
      return CreateService.formattedDate(date);
    };

    CreateService.loadScope($scope);

    $scope.$on('toggle-saving-state', function() {
      vm.saving = !vm.saving;
    });

    $scope.$watch('district', function(val) {
      CreateService.loadDistrict(val);
    });
  }
})();
