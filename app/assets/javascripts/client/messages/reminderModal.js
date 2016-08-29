(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('reminderModal', reminderModal);

  function reminderModal() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        context: '@'
      },
      templateUrl: 'client/messages/reminder_modal.html',
      controller: 'ReminderModalCtrl',
      controllerAs: 'reminderModal'
    }
  }
})();