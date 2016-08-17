(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ModifyScheduleCtrl', ModifyScheduleCtrl);

  ModifyScheduleCtrl.$inject = [
    '$scope',
    '$timeout',
    'AssessmentService',
    'assessment'
  ];

  function ModifyScheduleCtrl($scope, $timeout, AssessmentService, assessment) {
    $timeout(function() {
      if (assessment.due_date != null) {
        $scope.modal_due_date = moment(assessment.due_date).format("MM/DD/YYYY");
      }

      if (assessment.meeting_date != null) {
        $scope.modal_meeting_date = moment(assessment.meeting_date).format("MM/DD/YYYY");
      }

      $('.datetime').datetimepicker({pickTime: false});

    });

    $scope.updateAssessment = function() {
      assessment.due_date = moment($('#due-date').val()).toISOString();
      assessment.meeting_date = moment($('#meeting-date').val()).toISOString();
      AssessmentService.save(assessment)
          .then(function() {
            $scope.$close(true);
          }).catch(function(errMsg) {
            console.log(errMsg.data.errors);
          });
    };
  }
})();
