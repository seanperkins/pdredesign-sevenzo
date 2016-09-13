(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisDashboardCtrl', AnalysisDashboardCtrl);

  AnalysisDashboardCtrl.$inject = [
    '$modal',
    '$scope',
    'CreateService',
    'inventory',
    'current_analysis',
    'analysisMessages'
  ];

  function AnalysisDashboardCtrl($modal, $scope, CreateService, inventory, current_analysis, analysisMessages) {
    var vm = this;
    vm.currentAnalysis = current_analysis;
    CreateService.setContext('analysis');
    vm.inventory = inventory;
    vm.participants = CreateService.loadParticipants();
    vm.messages = analysisMessages.messages;

    vm.createReminder = function() {
      vm.modal = $modal.open({
        template: '<reminder-modal context="analysis"></reminder-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-reminder-modal', function() {
      vm.modal.dismiss('cancel');
    });

    $scope.$on('update_participants', function() {
      vm.participants = CreateService.loadParticipants();
    });
  }
})();
