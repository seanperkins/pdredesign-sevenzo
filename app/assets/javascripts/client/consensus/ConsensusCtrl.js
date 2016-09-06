(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('ConsensusCtrl', ConsensusCtrl);

  ConsensusCtrl.$inject = [
    '$scope',
    'ResponseHelper',
    'ConsensusStateService',
    'ConsensusService'
  ];

  function ConsensusCtrl($scope, ResponseHelper, ConsensusStateService, ConsensusService) {
    var vm = this;
    vm.isConsensus = true;
    vm.isReadOnly = true;
    vm.teamRole = null;
    vm.teamRoles = [];
    vm.loading = false;
    vm.answerPercentages = [];

    vm.assessmentId = $scope.assessmentId;
    vm.responseId = $scope.responseId;
    vm.entity = $scope.entity;
    vm.consensus = $scope.consensus;
    vm.context = $scope.context;

    ConsensusService.setContext(vm.context);
    vm.isAssessment = vm.context === 'assessment';
    vm.isAnalysis = vm.context === 'analysis';

    vm.isLoading = function () {
      return vm.loading;
    };

    vm.toggleCategoryAnswers = function (category) {
      category.toggled = !category.toggled;
      angular.forEach(category.questions, function (question, key) {
        ResponseHelper.toggleCategoryAnswers(question);
        $scope.$broadcast('question-toggled', question.id);
      });
    };

    vm.toggleAnswers = function (question, $event) {
      ResponseHelper.toggleAnswers(question, $event);
    };

    vm.questionColor = ResponseHelper.questionColor;
    vm.answerCount = ResponseHelper.answerCount;
    vm.saveEvidence = ResponseHelper.saveEvidence;
    vm.editAnswer = ResponseHelper.editAnswer;
    vm.answerTitle = ResponseHelper.answerTitle;
    vm.percentageByResponse = ResponseHelper.percentageByResponse;

    vm.toggleAnswers = function (question, $event) {
      $scope.$broadcast('question-toggled', question.id);
      ResponseHelper.toggleAnswers(question, $event);
    };

    vm.assignAnswerToQuestion = function (answer, question) {
      switch (true) {
        case vm.isReadOnly:
          return false;
        case !question || !question.score:
        case question.score.evidence == null || question.score.evidence == '':
          question.isAlert = true;
          return false;
      }

      ResponseHelper.assignAnswerToQuestion(vm, answer, question);
    };

    vm.viewModes = [{label: "Category"}, {label: "Variance"}];
    vm.viewMode = vm.viewModes[0];

    $scope.$on('submit_consensus', function () {
      ConsensusService
        .submitConsensus(vm.consensus.id)
        .then(function () {
          ConsensusService.redirectToReport();
        });
    });

    vm.updateConsensus = function () {
      return ConsensusService
        .loadConsensus(vm.consensus.id, vm.teamRole)
        .then(function (data) {
          vm.updateConsensusState(data);
          vm.scores = data.scores;
          vm.data = data.categories;
          vm.categories = data.categories;
          vm.teamRoles = data.team_roles;
          vm.isReadOnly = data.is_completed || false;
          vm.participantCount = data.participant_count;

          return true;
        });
    };

    vm.updateConsensusState = function (data) {
      ConsensusStateService.addConsensusData(data);
    };

    vm.updateTeamRole = function (teamRole) {
      if (teamRole.trim() == "") teamRole = null;
      vm.teamRole = teamRole;

      vm.loading = true;
      vm.updateConsensus()
        .then(function () {
          vm.loading = false;
        });
    };

    if (vm.context === "analysis") {
      ConsensusService
        .getInventoryProductAndDataEntries()
        .then(function (data) {
          vm.productEntries = data[0].product_entries;
          vm.dataEntries = data[1].data_entries;
        });
    }

    $scope.$watch('vm.data', function (val) {
      console.log(val);
    });
  }
})();
