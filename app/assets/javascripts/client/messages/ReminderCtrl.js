(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ReminderModalCtrl', ReminderModalCtrl);

  ReminderModalCtrl.$inject = [
    '$scope',
    'MessageService'
  ];

  function ReminderModalCtrl($scope, MessageService) {
    var vm = this;

    MessageService.setContext($scope.context);

    vm.closeModal = function() {
      $scope.$emit('close-reminder-modal');
    };

    vm.sendReminder = function(message) {
      MessageService.sendMessage(message)
          .then(function() {
            vm.closeModal();
          });
    };
  }
})();