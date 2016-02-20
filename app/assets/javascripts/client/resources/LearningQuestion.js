(function () {
  PDRClient.factory('LearningQuestion', ['$resource', 'UrlService', learningQuestionFactory]);

  var methodOptions = {
    'create': {method: 'POST'},
    'update': {method: 'PATCH', params: {id: '@id', assessment_id: '@assessment_id'}}
  };

  function learningQuestionFactory($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/learning_questions/:id'), null, methodOptions);
  }
})();