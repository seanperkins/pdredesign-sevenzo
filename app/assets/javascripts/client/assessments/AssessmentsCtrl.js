(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('AssessmentsCtrl', AssessmentsCtrl);

  AssessmentsCtrl.$inject = [
    '$scope',
    '$modal',
    'SessionService',
    'RecommendationTextService',
    'assessments'
  ];

  function AssessmentsCtrl($scope, $modal, SessionService, RecommendationTextService, assessments) {
    var vm = this;

    vm.assessments = assessments;
    vm.user = SessionService.getCurrentUser();
    vm.role = null;

    vm.selectedPermission = '';
    vm.selectedDistrict = '';
    vm.selectedStatus = '';
    vm.permissionTypes = ['Organizer', 'Observer'];

    vm.text = function() {
      return RecommendationTextService.assessmentText();
    };

    $scope.$watch('user', function() {
      if (!vm.user) {
        return;
      }

      vm.role = vm.user.role;
    });

    vm.isNetworkPartner = function() {
      return SessionService.isNetworkPartner();
    };

    vm.districtOptions = function(assessments) {

      var districts = [];
      angular.forEach(assessments, function(assessment, key) {
        if (districts.indexOf(assessment.district_name) == -1) {
          districts.push(assessment.district_name);
        }
      });

      return districts;
    };

    vm.statusesOptions = function(assessments) {
      var statuses = [];
      angular.forEach(assessments, function(assessment, key) {
        if (statuses.indexOf(assessment.status) == -1) {
          statuses.push(assessment.status);
        }
      });
      return statuses;
    };

    vm.permissionsFilter = function(filter) {
      if (filter === 'Observer') {
        return {is_participant: true};
      }

      if (filter === 'Organizer') {
        return {is_facilitator: true};
      }
    };

    vm.statuses = vm.statusesOptions(assessments);

    vm.districts = vm.districtOptions(assessments);

    vm.responseLinkDisabled = function(assessment) {
      return !!(_.isEmpty(assessment.responses) && !assessment.is_participant);
    };

    vm.openAssessmentModal = function() {
      vm.assessmentModal = $modal.open({
        templateUrl: 'client/home/assessment_modal.html',
        controller: 'AssessmentModalCtrl',
        controllerAs: 'assessmentModal'
      });
    }
  }
})();
