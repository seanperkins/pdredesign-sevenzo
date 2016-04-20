(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisAssignCtrl', AnalysisAssignCtrl);

  AnalysisAssignCtrl.$inject = [
    '$anchorScroll',
    '$scope',
    '$timeout',
    'CreateService',
    'SessionService',
    'current_inventory',
    'current_analysis'
  ];

  function AnalysisAssignCtrl($anchorScroll, $scope, $timeout, CreateService, SessionService, current_inventory, current_analysis) {
    var vm = this;

    CreateService.setContext('analysis');
    vm.user = SessionService.getCurrentUser();
    vm.alerts = [];
    vm.district = CreateService.extractCurrentDistrict(vm.user, current_inventory);

    vm.currentInventory = current_inventory;
    vm.currentAnalysis = current_analysis;

    /*
    vm.assignAndSave = function(inventory) {
      CreateService.assignAndSaveInventory(inventory);
    };

    vm.save = function(inventory) {
      CreateService.saveInventory(inventory);
    };

    vm.success = function(message) {
      vm.alerts.push({type: 'success', msg: message});
      $anchorScroll();
      $timeout(function() {
        vm.alerts.splice(message, 1);
      }, 10000);
    };

    vm.error = function(message) {
      vm.alerts.push({type: 'danger', msg: message});
      $anchorScroll();
    };

    vm.closeAlert = function(index) {
      vm.alerts.splice(index, 1);
    };

    $scope.$on('add-assign-alert', function(event, data) {
      if(data['type'] === 'success') {
        vm.success(data['msg']);
      } else if(data['type'] === 'danger') {
        vm.error(data['msg']);
      }
    });
    */
  }
})();
