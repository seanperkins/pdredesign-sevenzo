(function () {
  'use strict';

  angular.module('PDRClient')
    .service('AccessService', AccessRequestService);

  AccessRequestService.$inject = [
    'AccessRequest'
  ];

  function AccessRequestService(AccessRequest) {
    var service = this;

    service.setContext = function (context) {
      service.context = context;
    };

    service.save = function (id, role) {
      if (service.context === 'assessment') {
        return AccessRequest.save({assessment_id: id}, {roles: [role]})
          .$promise;
      }
    };
  }
})();