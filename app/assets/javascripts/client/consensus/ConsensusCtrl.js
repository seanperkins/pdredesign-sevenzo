(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('ConsensusCtrl', ConsensusCtrl);

  ConsensusCtrl.$inject = [
    '$scope',
    '$timeout',
    'ResponseHelper',
    'ConsensusStateService',
    'ConsensusService'
  ];

  function ConsensusCtrl($scope, $timeout, ResponseHelper, ConsensusStateService, ConsensusService) {
    var vm = this;
    vm.isConsensus = true;
    vm.isReadOnly = true;
    vm.teamRole = null;
    vm.teamRoles = [];
    vm.loading = false;
    vm.displayMode = 'category';
    vm.consensus = $scope.consensus;

    ConsensusService.setContext($scope.questionType);

    vm.isLoading = function () {
      return vm.loading;
    };

    vm.questionColor = ResponseHelper.questionColor;
    vm.answerCount = ResponseHelper.answerCount;
    vm.saveEvidence = ResponseHelper.saveEvidence;
    vm.editAnswer = ResponseHelper.editAnswer;
    vm.answerTitle = ResponseHelper.answerTitle;
    vm.percentageByResponse = ResponseHelper.percentageByResponse;

    vm.assignAnswerToQuestion = function (answer, question) {
      switch (true) {
        case vm.isReadOnly:
          return false;
        case !question || !question.score:
        case question.score.evidence === null || question.score.evidence === '':
          question.isAlert = true;
          return false;
      }

      ResponseHelper.assignAnswerToQuestion(vm, answer, question);
    };

    vm.viewModes = [{label: 'Category'}, {label: 'Variance'}];
    vm.viewMode = vm.viewModes[0];


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
          $scope.$broadcast('receiveCategoryData', vm.data);
          return true;
        });
    };

    vm.updateConsensusState = function (data) {
      ConsensusStateService.addConsensusData(data);
    };

    vm.updateTeamRole = function (teamRole) {
      if (teamRole.trim() === '') {
        teamRole = null;
      }

      vm.teamRole = teamRole;

      vm.loading = true;
      vm.updateConsensus()
        .then(function () {
          vm.loading = false;
        });
    };

    $timeout(function () {
      vm.updateConsensus();
    });

    $scope.$on('submit_consensus', function () {
      ConsensusService
        .submitConsensus(vm.consensus.id)
        .then(function () {
          ConsensusService.redirectToReport();
        });
    });

    $scope.$on('updateCategory', function (event, val) {
      vm.displayMode = 'category';
      vm.categories = val;
    });

    $scope.$on('updateVariance', function (event, val) {
      vm.displayMode = 'variance';
      vm.varianceOrderedQuestions = val;
    });
  }
})();
