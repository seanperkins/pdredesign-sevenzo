(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ModifyScheduleCtrl', ModifyScheduleCtrl);

  ModifyScheduleCtrl.$inject = [
    '$scope',
    'AssessmentService',
    'AlertService'
  ];

  function ModifyScheduleCtrl($scope, AssessmentService, AlertService) {
    var vm = this;

    AlertService.flush();

    vm.alerts = function() {
      return AlertService.getAlerts();
    };

    vm.closeAlert = function(index) {
      AlertService.closeAlert(index);
    };

    vm.updateAssessment = function() {
      var assessmentSubmission = angular.copy(vm.assessment, {});
      assessmentSubmission.due_date = moment($('#due-date').val(), 'MM/DD/YYYY').toISOString();
      assessmentSubmission.meeting_date = moment($('#meeting-date').val(), 'MM/DD/YYYY').toISOString();
      AssessmentService.save(assessmentSubmission)
        .then(function() {
          vm.assessment.due_date = assessmentSubmission.due_date;
          vm.assessment.meeting_date = assessmentSubmission.meeting_date;
          $scope.close(true);
        }).catch(function(response) {
          var errors = response.data.errors;
          angular.forEach(errors, function(message, field) {
          AlertService.addAlert('danger', field + ' ' + message);
        });
      });
    };
  }
})();
