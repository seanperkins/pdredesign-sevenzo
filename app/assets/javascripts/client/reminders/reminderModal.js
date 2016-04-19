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
      templateUrl: 'client/reminders/reminder_modal.html',
      controller: 'ReminderModalCtrl',
      controllerAs: 'reminderModal',
      link: reminderModalLink
    }
  }

  function reminderModalLink(scope, element, attributes, controller) {
    var parent = scope.$parent;
    controller.closeModal = function() {
      parent.modal.dismiss('cancel');
    };
  }
})();