(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisPriorityCtrl', AnalysisPriorityCtrl);

  AnalysisPriorityCtrl.$inject = [
    '$scope',
    '$filter',
    '$timeout'
  ];

  function AnalysisPriorityCtrl($scope, $filter, $timeout) {
    var vm = this;

    vm.priorityData = $scope.priorities;

    vm.convertToWholeDollars = function(amountInCents) {
      return $filter('currency')(amountInCents / 100, '$', 2);
    };

    vm.determineLink = function(link) {
      switch (link) {
        case 'Established a Shared Vision for PD':
          return 'https://www.edsurge.com/mlabs/establish-a-shared-vision-for-pd';
        case 'Identify PD Needs':
          return 'https://www.edsurge.com/mlabs/identify-pd-needs';
        case 'Personalize PD Plan':
          return 'https://www.edsurge.com/mlabs/personalize-pd-plan';
        case 'Access Multi-Modal PD Models':
          return 'https://www.edsurge.com/mlabs/access-multi-modal-pd-models';
        case 'Develop Teaching Practice':
          return 'https://www.edsurge.com/mlabs/develop-teaching-practice';
        case 'Build Collective Capacity':
          return 'https://www.edsurge.com/mlabs/build-collective-capacity';
        case 'Build School Community':
          return 'https://www.edsurge.com/mlabs/build-school-community';
        case 'Manage Talent':
          return 'https://www.edsurge.com/mlabs/manage-talent';
        case 'Observe and Evaluate Teachers':
          return 'https://www.edsurge.com/mlabs/observe-and-evaluate-teachers';
        case 'Evaluate PD Resources':
          return 'https://www.edsurge.com/mlabs/evaluate-pd-resources';
        case 'Improve PD Program':
          return 'https://www.edsurge.com/mlabs/improve-pd-program';
        default:
          return '';
      }
    };

    vm.initializeTable = function() {
      $timeout(function() {
        $('[data-table-dnd]').tableDnD();
      });
    };

    vm.initializeTable();
  }
})();