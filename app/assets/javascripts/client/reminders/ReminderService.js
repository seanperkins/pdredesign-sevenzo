(function() {
  'use strict';

  angular.module('PDRClient')
      .service('ReminderService', ReminderService);

  ReminderService.$inject = [
    '$stateParams',
    'AssessmentReminder',
    'InventoryReminder'
  ];

  function ReminderService($stateParams, AssessmentReminder, InventoryReminder) {
    var service = this;

    service.setContext = function(context) {
      service.context = context;
    };

    service.extractId = function() {
      return $stateParams.inventory_id || $stateParams.assessment_id || $stateParams.id;
    };

    service.sendReminder = function(message) {
      if (service.context === 'assessment') {
        return AssessmentReminder.save({assessment_id: service.extractId()}, {message: message})
            .$promise;
      } else if (service.context === 'inventory') {
        return InventoryReminder.save({inventory_id: service.extractId()}, {message: message})
            .$promise;
      }
    };
  }
})();