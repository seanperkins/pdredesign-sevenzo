(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisHighLevelTakeawayCtrl', AnalysisHighLevelTakeawayCtrl);

  AnalysisHighLevelTakeawayCtrl.$inject = [
    '$stateParams',
    'Analysis'
  ];

  function AnalysisHighLevelTakeawayCtrl($stateParams, Analysis) {
    var vm = this;

    vm.setDefaultTakeaway = function() {
      Analysis.get({inventory_id: $stateParams.inventory_id, id: $stateParams.id})
          .$promise
          .then(function(data) {
            vm.text = data.report_takeaway;
          });
    };

    vm.saveTakeaway = function(text) {
      Analysis.save({inventory_id: $stateParams.inventory_id, id: $stateParams.id}, {report_takeaway: text})
          .$promise
          .then(function() {

          }, function(err) {
            console.log(err);
          });
    };

    vm.setDefaultTakeaway();
  }
})();