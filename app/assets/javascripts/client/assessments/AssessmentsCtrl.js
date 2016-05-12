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

    $scope.assessments = assessments;
    $scope.user = SessionService.getCurrentUser();
    $scope.role = null;

    $scope.selectedPermission = '';
    $scope.selectedDistrict = '';
    $scope.selectedStatus = '';
    $scope.permissionTypes = ['Organizer', 'Observer'];

    $scope.text = function() {
      return RecommendationTextService.assessmentText();
    };

    $scope.$watch('user', function() {
      if (!$scope.user) {
        return;
      }

      $scope.role = $scope.user.role;
    });

    $scope.isNetworkPartner = function() {
      return SessionService.isNetworkPartner();
    };

    $scope.districtOptions = function(assessments) {

      var districts = [];
      angular.forEach(assessments, function(assessment, key) {
        if (districts.indexOf(assessment.district_name) == -1) {
          districts.push(assessment.district_name);
        }
      });

      return districts;
    };

    $scope.statusesOptions = function(assessments) {
      var statuses = [];
      angular.forEach(assessments, function(assessment, key) {
        if (statuses.indexOf(assessment.status) == -1) {
          statuses.push(assessment.status);
        }
      });
      return statuses;
    };

    $scope.permissionsFilter = function(filter) {
      if (filter === 'Observer') {
        return {is_participant: true};
      }

      if (filter === 'Organizer') {
        return {is_facilitator: true};
      }
    };

    $scope.statuses = $scope.statusesOptions(assessments);

    $scope.districts = $scope.districtOptions(assessments);

    $scope.responseLinkDisabled = function(assessment) {
      return !!(_.isEmpty(assessment.responses) && !assessment.is_participant);
    };

    $scope.openAssessmentModal = function() {
      $scope.assessmentModal = $modal.open({
        templateUrl: 'client/home/assessment_modal.html',
        controller: 'AssessmentModalCtrl',
        controllerAs: 'assessmentModal'
      });
    }
  }
})();
