(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('sortBy', sortBy);

  function sortBy() {
    return {
      restrict: 'E',
      transclude: true,
      require: '^consensus',
      scope: {},
      templateUrl: 'client/views/directives/consensus/sort_by.html',
      controller: 'SortByCtrl',
      controllerAs: 'sortBy'
    }
  }
})();