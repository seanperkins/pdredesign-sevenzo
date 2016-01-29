describe('Controller: ModifyScheduleCtrl', function() {
  var subject, scope;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $controller, $rootScope) {

      scope = $rootScope.$new();
      subject  = $controller('ModifyScheduleCtrl', {
        $scope: scope
      });
  }));
  
  describe('#updateAssessment', function() {

  });
});

