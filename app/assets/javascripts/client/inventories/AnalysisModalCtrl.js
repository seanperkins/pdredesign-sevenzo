(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisModalCtrl', AnalysisModalCtrl);

  AnalysisModalCtrl.$inject = [
    '$scope',
    'Analysis'
  ];

  function AnalysisModalCtrl($scope, Analysis) {
    var vm = this;

    vm.closeModal = function() {
      $scope.$emit('close-analysis-modal');
    };

    vm.analysis = {};

    vm.save = function () {
      Analysis.create({
        inventory_id: vm.inventory.id
      }, vm.analysis)
          .$promise
          .then(function (productEntry){
            vm.closeModal();
          }, function (response) {
          });
    };
  }
})();
