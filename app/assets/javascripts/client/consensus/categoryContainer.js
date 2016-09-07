(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('categoryContainer', categoryContainer);

  function categoryContainer() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        categories: '=',
        isConsensus: '@',
        scores: '=',
        questionType: '@',
        productEntries: '=',
        dataEntries: '='
      },
      templateUrl: 'client/consensus/category_container.html',
      controller: 'CategoryContainerCtrl',
      controllerAs: 'vm'
    }
  }
})();