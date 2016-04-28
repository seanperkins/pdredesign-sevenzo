(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('ConsensusShowCtrl', ConsensusShowCtrl);

  ConsensusShowCtrl.$inject = [
    '$scope',
    'SessionService',
    'Assessment',
    'ConsensusHelper',
    '$stateParams',
    'ConsensusService',
    'current_context',
    'current_entity',
    'consensus'
  ];

  function ConsensusShowCtrl($scope, SessionService, Assessment, ConsensusHelper, $stateParams, ConsensusService, current_context, current_entity, consensus) {
    $scope.user = SessionService.getCurrentUser();

    ConsensusService.setContext(current_context);
    $scope.entity = current_entity;
    $scope.consensus = consensus;

    $scope.exportToPDF = function() {
      ConsensusHelper.consensuToPDF($scope.assessmentId, $scope.responseId);
    };

    $scope.exportToCSV = function() {
      ConsensusHelper.consensuToCSV($scope.assessment, $scope.responseId);
    };
  }
})();
