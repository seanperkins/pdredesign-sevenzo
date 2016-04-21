(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryScheduleCtrl', InventoryScheduleCtrl);

  InventoryScheduleCtrl.$inject = [
    '$scope',
    '$modal'
  ];

  function InventoryScheduleCtrl($scope, $modal) {
    var vm = this;

    vm.displayLearningQuestions = function () {
      vm.modal = $modal.open({
        template: '<learning-question-modal context="inventory" reminder="false" />',
        scope: $scope
      });
    };

    $scope.$watch('inventory', function(val) {
      var date = moment(val.due_date);
      vm.month = date.format('MMM');
      vm.day = date.format('DD');
      vm.formattedDueDate = date.format('dddd MMMM Do');
    }).bind(vm);
  }
})();