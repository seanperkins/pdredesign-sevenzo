(function() {
  'use strict';

  angular.module('PDRClient')
      .service('MessageService', MessageService);

  MessageService.$inject = [
    '$stateParams',
    'AssessmentMessage',
    'InventoryMessage',
    'AnalysisMessage'
  ];

  function MessageService($stateParams, AssessmentMessage, InventoryMessage, AnalysisMessage) {
    var service = this;

    service.setContext = function(context) {
      service.context = context;
    };

    service.extractId = function() {
      return $stateParams.inventory_id || $stateParams.assessment_id || $stateParams.id;
    };

    service.sendMessage = function(message) {
      if (service.context === 'assessment') {
        return AssessmentMessage.save({assessment_id: service.extractId()}, {message: message})
            .$promise;
      } else if (service.context === 'inventory') {
        return InventoryMessage.save({inventory_id: service.extractId()}, {message: message})
            .$promise;
      } else if (service.context === 'analysis') {
        return AnalysisMessage.save({inventory_id: $stateParams.inventory_id, id: $stateParams.id}, {message: message})
            .$promise;
      }
    };
  }
})();
