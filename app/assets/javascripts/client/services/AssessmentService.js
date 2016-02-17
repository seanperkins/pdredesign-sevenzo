PDRClient.factory('AssessmentService', ['$state', function($state) {
  var service = {};
  service.sharedUrl = function(token) {
    return $state.href('shared_assessment_report', {token: token}, {absolute: true});
  };
  return service;
}]);

