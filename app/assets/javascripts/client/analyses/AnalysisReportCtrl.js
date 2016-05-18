(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisReportCtrl', AnalysisReportCtrl);

  AnalysisReportCtrl.$inject = [
    'analysis_priorities',
    'analysis_comparison_data'
  ];

  function AnalysisReportCtrl(analysis_priorities, analysis_comparison_data) {
    var vm = this;

    vm.priorities = analysis_priorities;
    vm.comparisonData = analysis_comparison_data;
  }
})();