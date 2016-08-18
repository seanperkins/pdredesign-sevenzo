(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ModifyScheduleCtrl', ModifyScheduleCtrl);

  ModifyScheduleCtrl.$inject = [
    'AssessmentService'
  ];

  function ModifyScheduleCtrl(AssessmentService) {
    var vm = this;

    vm.updateAssessment = function() {
      vm.assessment.due_date = moment($('#due-date').val()).toISOString();
      vm.assessment.meeting_date = moment($('#meeting-date').val()).toISOString();
      AssessmentService.save(vm.assessment)
          .then(function() {
            $scope.$close(true);
          }).catch(function(errMsg) {
            console.log(errMsg.data.errors);
          });
    };
  }
})();
