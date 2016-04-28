(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisSidebarCtrl', AnalysisSidebarCtrl);

  AnalysisSidebarCtrl.$inject = [
    'current_analysis'
  ];

  function AnalysisSidebarCtrl(current_analysis) {
    var vm = this;
    vm.currentAnalysis = current_analysis;
  }
})();
