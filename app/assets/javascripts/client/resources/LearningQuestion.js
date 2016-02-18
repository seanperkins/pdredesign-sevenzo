(function () {
  PDRClient.factory('LearningQuestion', ['$resource', 'UrlService', learningQuestionFactory]);

  var methodOptions = {
    'create': {method: 'POST'},
    'update': {method: 'PATCH'}
  };

  function learningQuestionFactory($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/learning_questions/:id'), null, methodOptions);
  }
})();