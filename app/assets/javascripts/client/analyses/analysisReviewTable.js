(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('analysisReviewTable', analysisReviewTable);

  function analysisReviewTable() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        reviewHeaderData: '='
      },
      templateUrl: 'client/analyses/review_table.html'
    }
  }
})();