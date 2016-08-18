(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('modifySchedule', modifySchedule);

  function modifySchedule() {
    return {
      restrict: 'E',
      replace: true,
      controller: 'ModifyScheduleCtrl',
      controllerAs: 'vm',
      link: modifyScheduleLink,
      templateUrl: 'client/assessments/modify_schedule.html',
      scope: {
        assessment: '='
      }
    }
  }

  function modifyScheduleLink(scope, element, attrs, controller) {
    scope.close = function() {
      return scope.$parent.$close();
    };

    controller.assessment = scope.assessment;

    if (scope.assessment.due_date != null) {
      controller.modal_due_date = moment(scope.assessment.due_date).format('MM/DD/YYYY');
    }

    if (scope.assessment.meeting_date != null) {
      controller.modal_meeting_date = moment(scope.assessment.meeting_date).format('MM/DD/YYYY');
    }

    $('.datetime').datetimepicker({pickTime: false});
  }
})();