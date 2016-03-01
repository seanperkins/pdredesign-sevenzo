(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('ResponseCtrl', ResponseCtrl);

  ResponseCtrl.$inject = [
    '$scope',
    '$timeout',
    '$stateParams',
    '$modal',
    'Assessment'
  ];

  function ResponseCtrl($scope, $timeout, $stateParams, $modal, Assessment) {

    $scope.assessmentId = $stateParams.assessment_id;
    $scope.responseId = $stateParams.response_id;
    $scope.assessment = Assessment.get({id: $stateParams.assessment_id});

    $scope.$on('responses-loaded', function() {
      $timeout(function() {
        $scope.modal = $modal.open({
          template: '<learning-question-modal reminder="true" />',
          scope: $scope
        });
      });
    });
  }
})();
