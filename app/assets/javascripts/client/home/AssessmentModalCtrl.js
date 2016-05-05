(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AssessmentModalCtrl', AssessmentModalCtrl);

  AssessmentModalCtrl.$inject = [
    '$scope',
    '$location',
    'AssessmentService'
  ];

  function AssessmentModalCtrl($scope, $location, AssessmentService) {
    var vm = this;

    vm.alerts = [];
    vm.modalTitle = AssessmentService.text;
    vm.user = AssessmentService.currentUser;
    vm.district = vm.user.districts[0];
    vm.userIsNetworkPartner = AssessmentService.userIsNetworkPartner;

    vm.noDistrict = function() {
      return _.isEmpty(vm.user.district_ids);
    };

    vm.redirectToAssessment = function(assessment) {
      vm.hideModal();
      $location.path('assessments/' + assessment.id + '/assign');
    };

    vm.hideModal = function() {
      $scope.$emit('close-assessment-modal');
    };

    vm.success = function(message) {
      vm.alerts.push({type: 'success', msg: message});
    };

    vm.error = function(message) {
      vm.alerts.push({type: 'danger', msg: message});
    };

    vm.closeAlert = function(index) {
      vm.alerts.splice(index, 1);
    };


    vm.create = function(assessment) {
      assessment.due_date = moment($("#due-date").val(), 'MM-DD-YYYY').toISOString();
      assessment.district_id = vm.district.id;

      AssessmentService
          .create(assessment)
          .then(function(data) {
            vm.success('Assessment Created.');
            vm.redirectToAssessment(data);
          }, function(response) {
            var errors = response.data.errors;
            angular.forEach(errors, function(error, field) {
              vm.error(field + " : " + error);
            });
          });
    };
  }
})();