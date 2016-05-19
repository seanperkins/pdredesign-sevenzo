(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AnalysisDeadlineModalCtrl', AnalysisDeadlineModalCtrl);

  AnalysisDeadlineModalCtrl.$inject = [
    '$scope',
    '$timeout',
    'Analysis'
  ];

  function AnalysisDeadlineModalCtrl($scope, $timeout, Analysis) {
    var vm = this;
    vm.analysis = $scope.analysis;
    vm.closeModal = function() {
      $scope.$emit('close-deadline-modal');
    }

    $timeout(function() {
      if(vm.analysis.deadline != null) {
        $scope.modal_due_date = moment($scope.analysis.deadline).format("MM/DD/YYYY");
      }

      $('.datetime').datetimepicker({pickTime: false});
    });

    vm.save = function() {
      vm.analysis.deadline = moment($('#due-date').val(), 'MM/DD/YYYY').toISOString();

      Analysis.save({inventory_id: vm.analysis.inventory_id, id: vm.analysis.id}, vm.analysis).$promise.then(function(){
        vm.closeModal();
      });
    };
  }
})();
