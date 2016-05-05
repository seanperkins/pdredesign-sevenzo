PDRClient.directive('consensus', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        assessmentId:  '@',
        responseId:    '@',
        entity:        '=',
        consensus:     '=',
        context:       '@'
      },
      templateUrl: 'client/views/directives/consensus/consensus_questions.html',
      controller: [
        '$scope',
        '$timeout',
        'Consensus',
        'ResponseHelper',
        'ConsensusStateService',
        'ConsensusService',
        function($scope, $timeout, Consensus, ResponseHelper, ConsensusStateService, ConsensusService) {

          $scope.isConsensus        = true;
          $scope.isReadOnly         = true;
          $scope.teamRole           = null;
          $scope.teamRoles          = [];
          $scope.loading            = false;
          $scope.answerPercentages  = [];

          ConsensusService.setContext($scope.context);
          $scope.isAssessment = $scope.context === 'assessment';
          $scope.isAnalysis = $scope.context === 'analysis';

          $scope.isLoading = function(){ return $scope.loading; };

          $scope.toggleCategoryAnswers = function(category) {
            category.toggled = !category.toggled;
            angular.forEach(category.questions, function(question, key) {
              ResponseHelper.toggleCategoryAnswers(question);
            });
          };

          $scope.toggleAnswers = function(question, $event) {
            ResponseHelper.toggleAnswers(question, $event);
          };

          $scope.questionColor          = ResponseHelper.questionColor;
          $scope.answerCount            = ResponseHelper.answerCount;
          $scope.saveEvidence           = ResponseHelper.saveEvidence;
          $scope.editAnswer             = ResponseHelper.editAnswer;
          $scope.answerTitle            = ResponseHelper.answerTitle;
          $scope.percentageByResponse   = ResponseHelper.percentageByResponse;

          $scope.assignAnswerToQuestion = function (answer, question) {
            switch(true) {
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
          $scope.viewMode  = $scope.viewModes[0];

          $scope.$on('submit_consensus', function() {
            ConsensusService
              .submitConsensus($scope.consensus.id)
              .then( function () {
                ConsensusService.redirectToReport();
              });
          });

          $scope.updateConsensus = function(){
            /*
            return ConsensusService
              .loadConsensus($scope.consensus.id, $scope.teamRole)
              .then(function (data) {
                $scope.updateConsensusState(data);
                $scope.scores     = data.scores;
                $scope.data       = data.categories;
                $scope.categories = data.categories;
                */
                $scope.categories = [
                  {
                    "id": 14,
                    "name": "Data & Tech Analysis Category",
                    "axis_id": 12,
                    "questions": [
                      {
                        "id": 103,
                        "order": 0,
                        "variance": 1,
                        "content": "PD programs are developed based on a shared vision for teaching and learning.",
                        "headline": "Established a Shared Vision for PD",
                        "category_id": 14,
                        "score": {
                          "id": 2965,
                          "value": 2,
                          "evidence" : null,
                          "supporting_inventory_response": {
                            "id": 1,
                            "score_id": 2965,
                            "product_entries": [1],
                            "data_entries": [2],
                            "product_entry_evidence": "sure",
                            "data_entry_evidence": null,
                            "created_at": "2016-04-29T22:28:57.567Z",
                            "updated_at": "2016-04-29T22:29:15.180Z"
                          },
                          "response_id": 123,
                          "question_id": 103,
                          "created_at": "2016-04-29T22:29:15.174Z",
                          "updated_at": "2016-04-29T22:29:15.174Z"
                        },
                        "answers": [
                          {
                            "id": 409,
                            "value": 1,
                            "content": null,
                            "question_id": 103,
                            "created_at": "2016-04-27T21:19:17.140Z",
                            "updated_at": "2016-04-27T21:19:17.140Z"
                          },
                          {
                            "id": 410,
                            "value": 2,
                            "content": null,
                            "question_id": 103,
                            "created_at": "2016-04-27T21:19:17.141Z",
                            "updated_at": "2016-04-27T21:19:17.141Z"
                          },
                          {
                            "id": 411,
                            "value": 3,
                            "content": null,
                            "question_id": 103,
                            "created_at": "2016-04-27T21:19:17.142Z",
                            "updated_at": "2016-04-27T21:19:17.142Z"
                          },
                          {
                            "id": 412,
                            "value": 4,
                            "content": null,
                            "question_id": 103,
                            "created_at": "2016-04-27T21:19:17.143Z",
                            "updated_at": "2016-04-27T21:19:17.143Z"
                          }
                        ]
                      },
                      {
                        "id": 104,
                        "order": 1,
                        "variance": 20,
                        "content": "Teacher PD needs are identified based on a clear, common framework for effectiveness.",
                        "headline": "Identify PD Needs",
                        "category_id": 14,
                        "score": {
                          "id": 2966,
                          "value": null,
                          "evidence": null,
                          "supporting_inventory_response": {
                            "id": 2,
                            "score_id": 2966,
                            "product_entries": [],
                            "data_entries": [],
                            "product_entry_evidence": null,
                            "data_entry_evidence": null,
                            "created_at": "2016-04-29T22:29:15.188Z",
                            "updated_at": "2016-04-29T22:29:33.876Z"
                          },
                          "response_id": 123,
                          "question_id": 104,
                          "created_at": "2016-04-29T22:29:33.871Z",
                          "updated_at": "2016-04-29T22:29:33.871Z"
                        },
                        "answers" : [
                          {
                            "id": 409,
                            "value": 1,
                            "content": null,
                            "question_id": 103,
                            "created_at": "2016-04-27T21:19:17.140Z",
                            "updated_at": "2016-04-27T21:19:17.140Z"
                          },
                          {
                            "id": 410,
                            "value": 2,
                            "content": null,
                            "question_id": 103,
                            "created_at": "2016-04-27T21:19:17.141Z",
                            "updated_at": "2016-04-27T21:19:17.141Z"
                          },
                          {
                            "id": 411,
                            "value": 3,
                            "content": null,
                            "question_id": 103,
                            "created_at": "2016-04-27T21:19:17.142Z",
                            "updated_at": "2016-04-27T21:19:17.142Z"
                          },
                          {
                            "id": 412,
                            "value": 4,
                            "content": null,
                            "question_id": 103,
                            "created_at": "2016-04-27T21:19:17.143Z",
                            "updated_at": "2016-04-27T21:19:17.143Z"
                          }
                        ]
                      }
                    ]
                  },
                  {
                    "id": 15,
                    "name": "Data & Tech Analysis Category",
                    "axis_id": 12,
                    "questions": [
                      {
                        "id": 103,
                        "order": 0,
                        "variance": 5,
                        "content": "PD programs are developed based on a shared vision for teaching and learning.",
                        "headline": "Established a Shared Vision for PD",
                        "category_id": 15,
                        "score": {
                          "id": 2965,
                          "value": null,
                          "evidence" : null,
                          "supporting_inventory_response": {
                            "id": 1,
                            "score_id": 2965,
                            "product_entries": [1],
                            "data_entries": [2],
                            "product_entry_evidence": "sure",
                            "data_entry_evidence": null,
                            "created_at": "2016-04-29T22:28:57.567Z",
                            "updated_at": "2016-04-29T22:29:15.180Z"
                          },
                          "response_id": 123,
                          "question_id": 103,
                          "created_at": "2016-04-29T22:29:15.174Z",
                          "updated_at": "2016-04-29T22:29:15.174Z"
                        },
                        "answers": [
                          {
                            "id": 409,
                            "value": 1,
                            "content": null,
                            "question_id": 103,
                            "created_at": "2016-04-27T21:19:17.140Z",
                            "updated_at": "2016-04-27T21:19:17.140Z"
                          },
                          {
                            "id": 410,
                            "value": 2,
                            "content": null,
                            "question_id": 103,
                            "created_at": "2016-04-27T21:19:17.141Z",
                            "updated_at": "2016-04-27T21:19:17.141Z"
                          },
                          {
                            "id": 411,
                            "value": 3,
                            "content": null,
                            "question_id": 103,
                            "created_at": "2016-04-27T21:19:17.142Z",
                            "updated_at": "2016-04-27T21:19:17.142Z"
                          },
                          {
                            "id": 412,
                            "value": 4,
                            "content": null,
                            "question_id": 103,
                            "created_at": "2016-04-27T21:19:17.143Z",
                            "updated_at": "2016-04-27T21:19:17.143Z"
                          }
                        ]
                      }
                    ]
                  }
                ];
                $scope.data = angular.copy($scope.categories);
                /*
                $scope.teamRoles  = data.team_roles;
                $scope.isReadOnly = data.is_completed || false;
                $scope.participantCount = data.participant_count;

                return true;
              });
                */
          };

          $scope.updateConsensusState = function(data) {
            ConsensusStateService.addConsensusData(data);
          };

          $scope.updateTeamRole = function(teamRole) {
            if(teamRole.trim() == "") teamRole = null;
            $scope.teamRole = teamRole;

            $scope.loading = true;
            $scope
              .updateConsensus()
              .then(function(){
                $scope.loading = false;
              });
          };

          $scope.scoreValue = function(score) {
            if(!score || score <= 0)
              return "S";
            return "" + score;
          };

          $scope.scoreClass = function(score) {
            if(!score || score <= 0)
              return "skipped";
            return "scored-" + score;
          };

          $timeout(function(){ $scope.updateConsensus(); });

          
          // FIXME $scope.resource will be something like
          // question[0].score.whatever.product_entry_ids or so.
          // Also, this will only be done if we're in an analysis context.
          $scope.productEntries = [{id: 1, general_inventory_question: {product_name: 'derp'}},{id: 2, general_inventory_question: {product_name: 'herp'}}];
          $scope.dataEntries = [{id: 1, name: 'derp data'},{id: 2, name: 'data herp'}];
          if ($scope.context === "analysis") {
            ConsensusService
              .getInventoryProductAndDataEntries()
              .then(function (data) {
                $scope.product_entries = data[0].product_entries;
                $scope.data_entries = data[1].data_entries;
               });
          }
        }]
    };
}]);

PDRClient.filter('scoreFilter', function() {
  return function(input, questionId) {
    var scores = [];
    angular.forEach(input, function(score) {
      if(score.question_id == questionId) scores.push(score);
    });

    return scores;
  };
});
