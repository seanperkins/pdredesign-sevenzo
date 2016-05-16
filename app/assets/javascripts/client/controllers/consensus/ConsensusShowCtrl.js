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

    $scope.entity = current_entity;
    $scope.consensus = consensus;
    $scope.context = current_context;

    ConsensusService.setContext($scope.context);

    $scope.instructionParagraphs = ConsensusService.instructionParagraphs;

    $scope.exportToPDF = function() {
      ConsensusHelper.consensuToPDF($scope.assessmentId, $scope.responseId);
    };

    $scope.exportToCSV = function() {
      ConsensusHelper.consensuToCSV($scope.assessment, $scope.responseId);
    };
  }
})();
