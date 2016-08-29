(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AssessmentDashboardCtrl', AssessmentDashboardCtrl);

  AssessmentDashboardCtrl.$inject = [
    '$modal',
    '$scope',
    '$stateParams',
    'SessionService',
    'Assessment',
    'Participant'
  ];

  function AssessmentDashboardCtrl($modal, $scope, $stateParams, SessionService, Assessment, Participant) {
    var vm = this;

    vm.id = $stateParams.id;

    vm.showModal = $stateParams.showModal || false;
    vm.currentUser = SessionService.getCurrentUser();

    $scope.$on('update_participants', function() {
      vm.updateParticipantsList();
      vm.updateAssessment();
    });

    vm.updateParticipantsList = function() {
      vm.invitableParticipants = Participant.all({assessment_id: vm.id});
    };

    vm.updateAssessment = function() {
      Assessment
          .get({id: vm.id})
          .$promise
          .then(function(data) {
            vm.assessment = data;
            var averages = [];
            var labels = [];

            var shortnames = {
              "Teacher Engagement": "TE",
              "Delivery Infrastructure": "DI",
              "High Quality Content and Tools": "HQ",
              "PD Process": "PP",
              "Supportive Policies": "SP",
              "Leadership Capacity": "LC",
              "Data Infrastructure": "DTI",
              "Resource Optimization": "RO"
            };

            angular.forEach(data.averages, function(value, key) {
              labels.push(shortnames[key]);
              averages.push(value);
            });
          });
    };

    vm.addParticipant = function(user) {
      Participant.save({assessment_id: vm.id}, {user_id: user.id, send_invite: true});
      vm.updateParticipantsList();
      vm.updateAssessment();
    };

    vm.updateAssessment();
    vm.updateParticipantsList();

    vm.createReminder = function() {
      vm.modal = $modal.open({
        template: '<reminder-modal context="assessment"></reminder-modal>',
        scope: $scope
      });
    };

    $scope.$on('close-reminder-modal', function() {
      vm.modal.dismiss('cancel');
    });
  }
})();

