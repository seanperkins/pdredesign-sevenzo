(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AssessmentAssignCtrl', AssessmentAssignCtrl);

  AssessmentAssignCtrl.$inject = [
    '$scope',
    '$timeout',
    '$anchorScroll',
    '$stateParams',
    'SessionService',
    'Assessment',
    'CreateService'
  ];

  function AssessmentAssignCtrl($scope, $timeout, $anchorScroll, $stateParams, SessionService, Assessment, CreateService) {

    $scope.id = $stateParams.id;
    $scope.user = SessionService.getCurrentUser();
    $scope.alerts = [];
    $scope.alertError = false;

    $scope.district = $scope.user.districts[0];

    CreateService.loadScope($scope);
    CreateService.loadDistrict($scope.district);
    CreateService.setContext('assessment');

    $scope.fetchAssessment = function() {
      Assessment
        .get({id: $scope.id})
        .$promise
        .then(function(assessment) {
          $scope.assessment = assessment;
          $scope.district = CreateService.extractCurrentDistrict($scope.user, $scope.assessment);
        });
    };

    $scope.fetchAssessment();

    $scope.assignAndSave = function(assessment) {
      CreateService.assignAndSaveAssessment(assessment);
    };

    $scope.save = function(assessment) {
      CreateService.saveAssessment(assessment);
    };

    $scope.success = function(message) {
      $scope.alerts.push({type: 'success', msg: message});
      $anchorScroll();
      $timeout(function() {
        $scope.alerts.splice(message, 1);
      }, 10000);
    };

    $scope.error = function(message) {
      $scope.alerts.push({type: 'danger', msg: message});
      $anchorScroll();
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.$on('add-assign-alert', function(event, data) {
      if (data['type'] === 'success') {
        $scope.success(data['msg']);
      } else if (data['type'] === 'danger') {
        $scope.error(data['msg']);
      }
    });
  }
})();
