(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisReportCtrl', AnalysisReportCtrl);

  AnalysisReportCtrl.$inject = [
    'analysis_priorities',
    'analysis_comparison_data',
    'analysis_review_header_data'
  ];

  function AnalysisReportCtrl(analysis_priorities, analysis_comparison_data, analysis_review_header_data) {
    var vm = this;

    vm.priorities = analysis_priorities;
    vm.comparisonData = analysis_comparison_data;
    vm.reviewHeaderData = analysis_review_header_data;
  }
})();