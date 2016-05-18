(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisReportSidebarCtrl', AnalysisReportSidebarCtrl);

  AnalysisReportSidebarCtrl.$inject = [
    '$scope',
    '$stateParams'
  ];

  function AnalysisReportSidebarCtrl($scope, $stateParams) {
    var vm = this;

    vm.returnState = {
      inventory_id: $stateParams.inventory_id,
      id: $stateParams.id
    };

    $scope.$on('top-priority', function(evt, category) {
      vm.topPriority = category;
    });
  }
})();