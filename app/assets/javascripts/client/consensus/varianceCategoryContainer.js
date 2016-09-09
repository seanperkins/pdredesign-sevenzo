(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('varianceCategoryContainer', varianceCategoryContainer);

  function varianceCategoryContainer() {
    return {
      restrict: 'E',
      require: '^consensus',
      scope: {
        isConsensus: '@',
        varianceQuestions: '=',
        scores: '='
      },
      templateUrl: 'client/consensus/variance_category_container.html',
      controller: 'VarianceCategoryContainerCtrl',
      controllerAs: 'vm'
    }
  }
})();