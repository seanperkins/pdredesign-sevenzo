describe('Controller: AssessmentSharedReportCtrl', function() {
  var subject, scope;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $controller, $rootScope) {
      scope = $rootScope.$new();
      subject  = $controller('AssessmentReportCtrl', {
        $scope: scope
      });
  }));
});
