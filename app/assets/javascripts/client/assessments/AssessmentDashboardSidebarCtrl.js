(function() {
  'use strict';
  angular.module('PDRClient')
    .controller('AssessmentDashboardSidebarCtrl', AssessmentDashboardSidebarCtrl);

  AssessmentDashboardSidebarCtrl.$inject = [
    '$scope',
    '$modal',
    '$location',
    'Assessment',
    '$state',
    '$stateParams',
    'AssessmentReminder',
    'AssessmentService'
  ];

  function AssessmentDashboardSidebarCtrl($scope, $modal, $location, Assessment, $state, $stateParams, Reminder, AssessmentService) {
    var vm = this;
    vm.id = $stateParams.id;

    vm.fetchAssessment = function () {
      return Assessment.get({id: vm.id});
    };

    vm.assessment = vm.fetchAssessment();

    $scope.$watch('vm.assessment', function (assessment) {
      vm.shareURL = $state.href(
        'shared_assessment_report',
        {token: assessment.share_token},
        {absolute: true}
      );
    }, true);

    vm.modifySchedule = function () {
      vm.modal = $modal.open({
        template: '<modify-schedule assessment="vm.assessment"></modify-schedule>',
        scope: $scope
      });
    };

    vm.createConsensus = function () {
      vm.modal = $modal.open({
        templateUrl: 'client/views/modals/create_consensus.html',
        scope: $scope
      });
    };

    vm.redirectToCreateConsensus = function () {
      vm.close();
      $location.url('/assessments/' + vm.id + '/consensus');
    };

    vm.newReminder = function () {
      vm.modal = $modal.open({
        template: '<reminder-modal context="assessment"></reminder-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-reminder-modal', function() {
      vm.modal.dismiss('cancel');
    });


    vm.close = function () {
      vm.modal.dismiss('cancel');
    };

    vm.sendReminder = function (message) {
      Reminder
        .save({assessment_id: vm.id}, {message: message})
        .$promise
        .then(function () {
          vm.close();
        });
    };

    vm.addLearningQuestion = function () {
      vm.modal = $modal.open({
        template: '<learning-question-modal context="assessment" reminder="false"></learning-question-modal>',
        scope: $scope
      });
    };

    vm.meetingDateDaysAgo = function () {
      return moment().diff(vm.assessment.meeting_date, 'days');
    };

    vm.postMeetingDate = function () {
      if (!vm.assessment.meeting_date)
        return false;
      return moment().isAfter(vm.assessment.meeting_date);
    };

    vm.preMeetingDate = function () {
      if (!vm.assessment.meeting_date)
        return false;
      return moment().isBefore(vm.assessment.meeting_date);
    };

    vm.noMeetingDate = function () {
      return vm.assessment.meeting_date == null;
    };

    vm.reportPresent = function () {
      return vm.assessment.submitted_at !== null;
    };

    vm.meetingDayNumber = function () {
      return moment(vm.assessment.meeting_date).format('D');
    };

    vm.meetingDayName = function () {
      return moment(vm.assessment.meeting_date).format('dddd');
    };

    vm.meetingMonthName = function () {
      return moment(vm.assessment.meeting_date).format('MMM');
    };

    vm.consensusStarted = function () {
      return vm.assessment.status == 'consensus';
    };

    $scope.$on('close-learning-question-modal', function() {
      vm.modal.close('cancel');
    });
  }
})();
