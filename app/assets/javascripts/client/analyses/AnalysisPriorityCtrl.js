(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisPriorityCtrl', AnalysisPriorityCtrl);

  AnalysisPriorityCtrl.$inject = [
    '$scope',
    '$filter'
  ];

  function AnalysisPriorityCtrl($scope, $filter) {
    var vm = this;

    vm.priorityData = $scope.priorities;

    vm.convertToWholeDollars = function(amountInCents) {
      return $filter('currency')(amountInCents / 100, '$', 2);
    }
  }
})();