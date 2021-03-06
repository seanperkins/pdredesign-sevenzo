(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('SidebarResponseCardCtrl', SidebarResponseCardCtrl);

  SidebarResponseCardCtrl.$inject = [
    '$modal',
    '$scope',
    '$rootScope',
    '$stateParams',
    '$location',
    '$anchorScroll',
    '$timeout',
    'Response',
    'ResponseHelper',
    'ConsensusService',
    'current_context',
    'current_entity',
    'consensus'
  ];

  function SidebarResponseCardCtrl ($modal, $scope, $rootScope, $stateParams,
                                    $location, $anchorScroll, $timeout,
                                    Response, ResponseHelper, ConsensusService,
                                    current_context, current_entity, consensus) {

    ConsensusService.setContext(current_context);

    $scope.current_entity = current_entity;
    $scope.consensus = consensus;

    $scope.skipped      = ResponseHelper.skipped;
    $scope.responseId   = $stateParams.response_id;
    $scope.questions    = [];

    $timeout(function(){
      if ($scope.isResponse()) {
        Response
          .get({assessment_id: $stateParams.assessment_id, id: $scope.responseId})
          .$promise
          .then(function(data){
            $scope.isReadOnly = data.is_completed || false;
          });
      } else {
        ConsensusService
          .loadConsensus($scope.consensus.id)
          .then(function(data){
            $scope.isReadOnly = data.is_completed || false;
          });
      }

      $scope.updateScores();
    });

    $scope.questionScoreValue = function(question) {
      if (!question || !question.score) {
        return null;
      }
      if (question.score.value == null && question.score.evidence != null) {
        return 'skipped';
      }
      return question.score.value;
    };

    $scope.updateScores = function() {
      ConsensusService.updateScores($scope.consensus.id)
        .then(function(questions) {
          $scope.questions = questions;
        });
    };

    $rootScope.$on('response_updated', function() {
      $scope.updateScores();
    });

    $scope.isAnswered = function(question) {
      switch (true) {
        case !question.score:
        case !question.score.evidence == null:
          return false;
        case $scope.skipped(question):
        case question.score.skipped == true:
        case question.score.value != null:
          return true;
        default:
          return false;
      }
    };

    $scope.answeredQuestions = function() {
      var count = 0;
      angular.forEach($scope.questions, function(question) {
        if ($scope.isAnswered(question)) {
          count++;
        }
      });

      return count;
    };

    $scope.unansweredQuestions = function() {
      window.questions = $scope.questions;
      window.scope = $scope;
      return $scope.questions.length - $scope.answeredQuestions();
    };

    $scope.scrollTo = function(questionId) {
      $location.hash("question-" + questionId);
      $anchorScroll();
    };

    $scope.responseTitle = function() {
      if ($scope.isResponse()) {
        return "Response";
      }
      if (!$scope.isResponse()) {
        return "Consensus";
      }
    };

    $scope.isResponse = function() {
      return $location.url().indexOf("responses") > -1;
    };

    $scope.canSubmit = function() {
      if ($scope.isResponse()) {
        return true;
      }
      return !$scope.isReadOnly;
    };

    $scope.isResponseCompleted = function() {
      return $scope.isReadOnly;
    };

    $scope.submitResponseModal = function() {
      $scope.modalInstance = $modal.open({
        templateUrl: 'client/views/modals/response_submit_modal.html',
        scope: $scope
      });
    };

    $scope.cancel = function() {
      $scope.modalInstance.dismiss('cancel');
    };

    $scope.redirectToEntityIndex = function() {
      ConsensusService.redirectToIndex();
    };

    $scope.submitResponse = function() {
      $scope.modalInstance.dismiss('cancel');
      $rootScope.$broadcast('submit_response');
      $rootScope.$broadcast('submit_consensus');
    };

    $scope.addLearningQuestion = function () {
      $scope.modal = $modal.open({
        template: '<learning-question-modal context="' + current_context + '" reminder="false" />',
        scope: $scope
      });
    };

    $scope.$on('close-learning-question-modal', function() {
      $scope.modal.close('cancel');
    });
  }
})();

