(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AssessmentModalCtrl', AssessmentModalCtrl);

  AssessmentModalCtrl.$inject = [
    '$location',
    '$modalInstance',
    '$timeout',
    'AssessmentService',
    'RecommendationTextService',
    'SessionService'
  ];

  function AssessmentModalCtrl($location, $modalInstance, $timeout, AssessmentService, RecommendationTextService, SessionService) {
    var vm = this;

    vm.alerts = [];
    vm.modalTitle = RecommendationTextService.assessmentText();
    vm.user = SessionService.getCurrentUser();
    vm.district = vm.user.districts[0];

    vm.userIsNetworkPartner = function() {
      return SessionService.isNetworkPartner();
    };

    vm.noDistrict = function() {
      return _.isEmpty(vm.user.district_ids);
    };

    vm.redirectToAssessment = function(assessment) {
      vm.hideModal();
      $location.path('assessments/' + assessment.id + '/assign');
    };

    vm.hideModal = function() {
      $modalInstance.close('cancel');
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

    $timeout(function() {
      vm.datetime = $('.datetime').datetimepicker({
        pickTime: false
      });

      vm.datetime.on('dp.change', function() {
        $('#due-date').trigger('change');
      });
    })
  }
})();