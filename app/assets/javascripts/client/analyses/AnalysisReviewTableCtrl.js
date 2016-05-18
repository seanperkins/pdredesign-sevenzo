(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisReviewTableCtrl', AnalysisReviewTableCtrl);

  AnalysisReviewTableCtrl.$inject = [
    '$scope'
  ];

  function AnalysisReviewTableCtrl($scope) {
    var vm = this;

    vm.expandedEntries = [];
    vm.reviewHeaderData = $scope.reviewHeaderData;

    vm.toggleEntryExpansion = function(entryId) {
      if (vm.hasExpanded(entryId)) {
        vm.expandedEntries.splice(vm.expandedEntries.indexOf(entryId), 1);
      } else {
        vm.expandedEntries.push(entryId);
      }
    };

    vm.hasExpanded = function(entryId) {
      return vm.expandedEntries.indexOf(entryId) != -1;
    };

    vm.pullTitlesForEntry = function(entryId) {
      var entry = _.find(vm.reviewHeaderData, function(element) {
        return element.supporting_response_id === entryId
      });

      if (entry) {
        return entry.product_titles;
      } else {
        return [];
      }
    };
  }
})();