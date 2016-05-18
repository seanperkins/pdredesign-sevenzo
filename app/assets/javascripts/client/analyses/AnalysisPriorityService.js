(function() {
  'use strict';

  angular.module('PDRClient')
      .service('AnalysisPriorityService', AnalysisPriorityService);

  AnalysisPriorityService.$inject = [
    '$stateParams',
    'AnalysisPriority'
  ];

  function AnalysisPriorityService($stateParams, AnalysisPriority) {
    var service = this;

    service.save = function(order) {
      return AnalysisPriority.save({
        inventory_id: $stateParams.inventory_id,
        id: $stateParams.id
      }, {order: order})
          .$promise;
    };

    service.load = function() {
      return AnalysisPriority.query({
        inventory_id: $stateParams.inventory_id,
        id: $stateParams.id
      })
          .$promise
    };
  }
})();