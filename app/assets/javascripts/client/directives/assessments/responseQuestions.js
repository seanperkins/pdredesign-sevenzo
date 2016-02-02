PDRClient.directive('responseQuestions', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {},
      templateUrl: 'client/views/directives/response_questions.html',
      link: function(scope, element, attrs) {
        scope.assessmentId = attrs.assessmentId;
        scope.responseId   = attrs.responseId;
      },
      controller: [
        '$scope',
        '$rootScope',
        '$timeout',
        '$stateParams',
        '$location',
        'SessionService',
        'Response',
        'Score',
        'ResponseHelper',
        function($scope, $rootScope, $timeout, $stateParams, $location, SessionService, Response, Score, ResponseHelper) {

          $scope.isConsensus = false;

          $scope.questionColor = ResponseHelper.questionColor;
          $scope.toggleAnswers = ResponseHelper.toggleAnswers;
          $scope.saveEvidence  = ResponseHelper.saveEvidence;
          $scope.editAnswer    = ResponseHelper.editAnswer;
          $scope.answerTitle   = ResponseHelper.answerTitle;

          $scope.toggleCategoryAnswers = function(category) {
            category.toggled = !category.toggled;
            angular.forEach(category.questions, function(question, key) {
              $scope.toggleAnswers(question);
            });
          };

          $scope.invalidEvidence = function (question) {
            return question.score.evidence == null ||  question.score.evidence  == '';
          };

          $scope.assignAnswerToQuestion = function (answer, question) {
            question.skipped = false;
            question.score.value = answer.value;
            if($scope.invalidEvidence(question)) return;

            ResponseHelper.assignAnswerToQuestion($scope, answer, question);
          };

          $scope.$on('submit_response', function() {
            Response
              .submit({assessment_id: $scope.assessmentId, id: $scope.responseId}, {submit: true})
              .$promise
              .then(function(data){
                $location.path('/assessments');
              });
          });

          $timeout(function(){
            $rootScope.$broadcast('start_change');
            Response
              .get({assessment_id: $scope.assessmentId, id: $scope.responseId})
              .$promise
              .then(function(data){
                $scope.categories = data.categories;
                $rootScope.$broadcast('success_change');
              });
          });

        }]
    };
}]);
