(function() {
  'use strict';

  angular.module('PDRClient')
      .service('AccessService', AccessRequestService);

  AccessRequestService.$inject = [
    'AccessRequest',
    'InventoryAccessRequest'
  ];

  function AccessRequestService(AccessRequest, InventoryAccessRequest) {
    var service = this;

    service.setContext = function(context) {
      service.context = context;
    };

    service.save = function(id, role) {
      if (service.context === 'assessment') {
        return AccessRequest.save({assessment_id: id}, {roles: [role]})
            .$promise;
      } else if (service.context === 'inventory') {
        return InventoryAccessRequest.save({inventory_id: id}, {roles: [role]})
            .$promise;
      }
    };
  }
})();