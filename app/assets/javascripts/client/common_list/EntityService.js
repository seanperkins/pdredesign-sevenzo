(function() {
  'use strict';

  angular.module('PDRClient')
      .service('EntityService', EntityService);

  function EntityService() {
    var service = this;

    service.completedStatusIcon = function(entity) {
      if (entity.consensus && entity.consensus.is_completed) {
        return 'fa-check';
      } else {
        return 'fa-spinner';
      }
    };

    service.draftStatusIcon = function(entity) {
      if (entity.has_access) {
        return 'fa-eye';
      } else {
        return 'fa-minus-circle';
      }
    };

    service.roundNumber = function(number) {
      return Math.floor(number);
    };
  }
})();