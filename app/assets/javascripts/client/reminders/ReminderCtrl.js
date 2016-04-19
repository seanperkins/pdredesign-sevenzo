(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ReminderModalCtrl', ReminderModalCtrl);

  ReminderModalCtrl.$inject = [
    '$scope',
    'ReminderService'
  ];

  function ReminderModalCtrl($scope, ReminderService) {
    var vm = this;

    ReminderService.setContext($scope.context);

    vm.closeModal = function() {
      $scope.$emit('close-reminder-modal');
    };

    vm.sendReminder = function(message) {
      ReminderService.sendReminder(message)
          .then(function() {
            vm.closeModal();
          });
    };
  }
})();