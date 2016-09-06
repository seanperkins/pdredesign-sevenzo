(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('ConsensusCtrl', ConsensusCtrl);

  ConsensusCtrl.$inject = [
    '$scope',
    '$timeout',
    'Consensus',
    'ResponseHelper',
    'ConsensusStateService',
    'ConsensusService'
  ];

  function ConsensusCtrl($scope, $timeout, Consensus, ResponseHelper, ConsensusStateService, ConsensusService) {
    $scope.isConsensus = true;
    $scope.isReadOnly = true;
    $scope.teamRole = null;
    $scope.teamRoles = [];
    $scope.loading = false;
    $scope.answerPercentages = [];

    ConsensusService.setContext($scope.context);
    $scope.isAssessment = $scope.context === 'assessment';
    $scope.isAnalysis = $scope.context === 'analysis';

    $scope.isLoading = function () {
      return $scope.loading;
    };

    $scope.toggleCategoryAnswers = function (category) {
      category.toggled = !category.toggled;
      angular.forEach(category.questions, function (question, key) {
        ResponseHelper.toggleCategoryAnswers(question);
        $scope.$broadcast('question-toggled', question.id);
      });
    };

    $scope.toggleAnswers = function (question, $event) {
      ResponseHelper.toggleAnswers(question, $event);
    };

    $scope.questionColor = ResponseHelper.questionColor;
    $scope.answerCount = ResponseHelper.answerCount;
    $scope.saveEvidence = ResponseHelper.saveEvidence;
    $scope.editAnswer = ResponseHelper.editAnswer;
    $scope.answerTitle = ResponseHelper.answerTitle;
    $scope.percentageByResponse = ResponseHelper.percentageByResponse;

    $scope.toggleAnswers = function (question, $event) {
      $scope.$broadcast('question-toggled', question.id);
      ResponseHelper.toggleAnswers(question, $event);
    };

    $scope.assignAnswerToQuestion = function (answer, question) {
      switch (true) {
        case $scope.isReadOnly:
          return false;
        case !question || !question.score:
        case question.score.evidence == null || question.score.evidence == '':
          question.isAlert = true;
          return false;
      }

      ResponseHelper.assignAnswerToQuestion($scope, answer, question);
    };

    $scope.viewModes = [{label: "Category"}, {label: "Variance"}];
    $scope.viewMode = $scope.viewModes[0];

    $scope.$on('submit_consensus', function () {
      ConsensusService
        .submitConsensus($scope.consensus.id)
        .then(function () {
          ConsensusService.redirectToReport();
        });
    });

    $scope.updateConsensus = function () {
      return ConsensusService
        .loadConsensus($scope.consensus.id, $scope.teamRole)
        .then(function (data) {
          $scope.updateConsensusState(data);
          $scope.scores = data.scores;
          $scope.data = data.categories;
          $scope.categories = data.categories;
          $scope.teamRoles = data.team_roles;
          $scope.isReadOnly = data.is_completed || false;
          $scope.participantCount = data.participant_count;

          return true;
        });
    };

    $scope.updateConsensusState = function (data) {
      ConsensusStateService.addConsensusData(data);
    };

    $scope.updateTeamRole = function (teamRole) {
      if (teamRole.trim() == "") teamRole = null;
      $scope.teamRole = teamRole;

      $scope.loading = true;
      $scope
        .updateConsensus()
        .then(function () {
          $scope.loading = false;
        });
    };

    $timeout(function () {
      $scope.updateConsensus();
    });

    if ($scope.context === "analysis") {
      ConsensusService
        .getInventoryProductAndDataEntries()
        .then(function (data) {
          $scope.productEntries = data[0].product_entries;
          $scope.dataEntries = data[1].data_entries;
        });
    }

    $scope.$watch('data', function (val) {
      console.log(val);
    });
  }
})();
