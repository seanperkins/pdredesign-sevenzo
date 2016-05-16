(function() {
  'use strict';
  angular.module('PDRClient')
      .service('ConsensusService', ConsensusService);

  ConsensusService.$inject = [
    '$stateParams',
    '$location',
    '$q',
    'Consensus',
    'AnalysisConsensus',
    'AnalysisResponse',
    'Score',
    'AnalysisConsensusScore',
    'ProductEntry',
    'DataEntry'
  ];

  function ConsensusService($stateParams, $location, $q, Consensus, AnalysisConsensus, AnalysisResponse, Score, AnalysisConsensusScore, ProductEntry, DataEntry) {
    var service = this;

    service.setContext = function(context) {
      service.context = context;
      return service;
    };

    service.extractId = function() {
      return $stateParams.assessment_id || $stateParams.analysis_id;
    };

    service.redirectToIndex = function () {
      if (service.context === "assessment") {
        $location.path("/assessments");
      } else if (service.context === "analysis") {
        $location.path("/inventories/" + $stateParams.inventory_id + "/analyses");
      }
    };

    service.redirectToReport = function () {
      if (service.context === "assessment") {
        $location.path("/assessments/" + service.extractId() + "/report");
      } else if (service.context === "analysis") {
        $location.path("/inventories/" + $stateParams.inventory_id + "/analyses/" + service.extractId() + "/report");
      }
    };

    service.redirectToCreatedConsensus = function (consensusId) {
      if (service.context === "assessment") {
        $location.path("/assessments/" + service.extractId() + "/consensus/" + consensusId);
      } else if (service.context === "analysis") {
        $location.path("/inventories/" + $stateParams.inventory_id + "/analyses/" + service.extractId() + "/consensus/" + consensusId);
      }
    };

    service.createConsensus = function () {
      if (service.context === "assessment") {
        return Consensus.create({
          assessment_id: service.extractId()
        }, {}).$promise;
      } else if (service.context === "analysis") {
        return AnalysisResponse.save({
          inventory_id: $stateParams.inventory_id,
          analysis_id: service.extractId()
        }, {}).$promise
        .then(function () {
          return AnalysisConsensus.create({
            inventory_id: $stateParams.inventory_id,
            analysis_id: service.extractId()
          }, {}).$promise;
        });
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
          inventory_id: $stateParams.inventory_id,
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
          inventory_id: $stateParams.inventory_id,
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
          inventory_id: $stateParams.inventory_id,
          analysis_id: service.extractId(),
          id: consensusId
        }, {
          submit: true
        }).$promise;
      }
    };

    service.getInventoryProductAndDataEntries = function () {
      var inventory = {};

      var product_entries = ProductEntry
        .get({inventory_id: $stateParams.inventory_id})
        .$promise;

      var data_entries = DataEntry
        .get({inventory_id: $stateParams.inventory_id})
        .$promise;

      return $q.all([product_entries, data_entries]);
    };

    service.instructionParagraphs = function () {
      if (service.context === "assessment") {
        return [
          'The Readiness Assessment consists of questions across the 8 categories of the <readiness-assessment-modal title="PD System Map"></readiness-assessment-modal>. As the Assessment facilitator, use this page to guide and document the conversation during the in-person consensus meeting.',
          'For each question, discuss the individual responses as a group to collectively decide a consensus score, including notes for reference. You may sort or skip questions to support a targeted discussion. Save each completed response as you move through the consensus meeting.'
        ];
      } else if (service.context === "analysis") {
        return [
          'The Data & Tech Analysis asks your team to rate the level of technology and data alignment in 11 categories related to professional development.',
          'For each category, discuss as a group to collectively decide a consensus score. Include notes, data sets, and products for reference. You may skip questions to support a targeted discussion. Remember to save each completed response.'
        ];
      }
    };
  }
})();
