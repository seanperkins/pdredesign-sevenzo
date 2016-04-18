(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InventoryScheduleCtrl', InventoryScheduleCtrl);

  InventoryScheduleCtrl.$inject = [
    '$scope'
  ];

  function InventoryScheduleCtrl($scope) {
    var vm = this;

    $scope.$watch('inventory', function(val) {
      var date = moment(val.due_date);
      vm.month = date.format('MMM');
      vm.day = date.format('DD');
      vm.formattedDueDate = date.format('dddd MMMM Do');
    }).bind(vm);
  }
})();