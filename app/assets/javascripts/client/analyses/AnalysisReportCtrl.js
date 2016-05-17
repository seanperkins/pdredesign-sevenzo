(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisReportCtrl', AnalysisReportCtrl);

  AnalysisReportCtrl.$inject = [
    'analysis_priorities'
  ];

  function AnalysisReportCtrl(analysis_priorities) {
    var vm = this;

    vm.priorities = analysis_priorities;
  }
})();