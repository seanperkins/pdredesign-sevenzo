(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisReportSidebarCtrl', AnalysisReportSidebarCtrl);

  AnalysisReportSidebarCtrl.$inject = [
    '$scope'
  ];

  function AnalysisReportSidebarCtrl($scope) {
    var vm = this;

    $scope.$on('top-priority', function(evt, category) {
      vm.topPriority = category;
    });
  }
})();