(function() {
  'use strict';

  angular.module('PDRClient')
      .service('LearningQuestionService', LearningQuestionService);

  LearningQuestionService.$inject = [
    '$stateParams',
    '$rootScope',
    'AssessmentLearningQuestion',
    'InventoryLearningQuestion'
  ];

  function LearningQuestionService($stateParams, $rootScope, AssessmentLearningQuestion, InventoryLearningQuestion) {
    var service = this;

    service.extractId = function() {
      return $stateParams.assessment_id || $stateParams.inventory_id || $stateParams.id;
    };

    service.setContext = function(context) {
      this.context = context;
    };

    service.validate = function(data) {
      if (!data) {
        return 'Questions may not be empty.';
      } else if (data.length > 255) {
        return 'You may not create a question that exceeds 255 characters in length.'
      }
    };

    service.performGetByContext = function() {
      if (service.context === 'assessment') {
        return AssessmentLearningQuestion.get({
          assessment_id: service.extractId()
        }).$promise;
      } else if (service.context === 'inventory') {
        return InventoryLearningQuestion.get({
          inventory_id: service.extractId()
        }).$promise;
      }
    };

    service.performDeleteByContext = function(model) {
      if (service.context === 'assessment') {
        return AssessmentLearningQuestion.delete({
          assessment_id: service.extractId(),
          id: model.id
        }).$promise;
      } else if (service.context === 'inventory') {
        return InventoryLearningQuestion.delete({
          inventory_id: service.extractId(),
          id: model.id
        }).$promise;
      }
    };

    service.performUpdateByContext = function(model) {
      if (service.context === 'assessment') {
        return AssessmentLearningQuestion.update({
          assessment_id: service.extractId(),
          id: model.id,
          learning_question: {body: model.body}
        }).$promise;
      } else if (service.context === 'inventory') {
        return InventoryLearningQuestion.update({
          inventory_id: service.extractId(),
          id: model.id,
          learning_question: {body: model.body}
        }).$promise;
      }
    };

    service.performCreateByContext = function(model) {
      if (service.context === 'assessment') {
        return AssessmentLearningQuestion.create({
          assessment_id: service.extractId()
        }, {learning_question: {body: model.body}}).$promise;
      } else if(service.context === 'inventory') {
        return InventoryLearningQuestion.create({
          inventory_id: service.extractId()
        }, {learning_question: {body: model.body}}).$promise;
      }
    };

    service.loadQuestions = function() {
      service.performGetByContext()
          .then(function(result) {
            $rootScope.$broadcast('learning-questions-updated', result);
          });
    };

    service.deleteLearningQuestion = function(model) {
      return service.performDeleteByContext(model);
    };

    service.updateLearningQuestion = function(model) {
      return service.performUpdateByContext(model);
    };

    service.createLearningQuestion = function(model) {
      return service.performCreateByContext(model);
    };
  }
})();