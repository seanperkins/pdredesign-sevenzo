(function() {
  'use strict';
  angular.module('PDRClient')
      .service('ConsensusService', ConsensusService);

  ConsensusService.$inject = [
    '$stateParams',
    'Consensus',
    'AnalysisConsensus',
    'Score',
    'AnalysisConsensusScore'
  ];

  function ConsensusService($stateParams, Consensus, AnalysisConsensus, Score, AnalysisConsensusScore) {
    var service = this;

    service.setContext = function(context) {
      service.context = context;
    };

    service.extractId = function() {
      return $stateParams.assessment_id || $stateParams.analysis_id;
    };

    service.redirectToIndex = function () {
      if (service.context === "assessment") {
        $location.path("/assessments");
      } else if (service.context === "analysis") {
        $location.path("/inventory/" + $stateParams.inventory_id + "/analyses");
      }
    };

    service.loadConsensus = function (consensusId, teamRole) {
      if (service.context === "assessment") {
        return Consensus.get({
          assessment_id: service.extractId(),
          id: consensusId,
          teamRole: teamRole
        }).$promise;
      } else if (service.context === "analysis") {
        return AnalysisConsensus.get({
          analysis_id: service.extractId(),
          id: consensusId,
          teamRole: teamRole
        }).$promise;
      }
    };

    service.updateScores = function (consensusId) {
      if (service.context === "assessment") {
        return Score.query({
          assessment_id: service.extractId(),
          response_id: consensusId
        }).$promise;
      } else if (service.context === "analysis") {
        return AnalysisConsensusScore.query({
          analysis_id: service.extractId(),
          response_id: consensusId
        }).$promise;
      }
    };

    service.submitConsensus = function (consensusId) {
      if (service.context === "assessment") {
        return Consensus.submit({
          assessment_id: service.extractId(),
          id: consensusId
        }, {
          submit: true
        }).$promise;
      } else if (service.context === "analysis") {
        return AnalysisConsensus.submit({
          analysis_id: service.extractId(),
          id: consensusId
        }, {
          submit: true
        }).$promise;
      }
    };
  }
})();

