describe('Directive: takeAway', function() {
  var element,
      isolatedScope,
      $scope,
      $compile,
      $httpBackend;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $httpBackend = $injector.get('$httpBackend');

    $httpBackend.when('GET', '/v1/assessments/1').respond({
      id: 1,
      is_facilitator: true,
    });

    element = angular.element("<take-away assessment-id='1'></take-away>");
    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
    $httpBackend.flush();
  }));

    it('sets assessmentId correctly', function(){
      expect(isolatedScope.assessmentId).toEqual('1');
    });

    it('isFacilitator returns true if assessment.is_facilitator is true', function(){
      isolatedScope.assessment.is_facilitator = true;
      expect(isolatedScope.isFacilitator()).toEqual(true);
    });

    it('isFacilitator returns true', function(){
      expect(isolatedScope.isFacilitator()).toEqual(true);
    });

    describe('#setEditing', function(){
      it('sets editing', function(){

        isolatedScope.setEditing(true);
        expect(isolatedScope.editing).toEqual(true);

        isolatedScope.setEditing(false);
        expect(isolatedScope.editing).toEqual(false);
      });
    });

    describe('saving state', function(){
      it('show a spinner when saving', function(){
        isolatedScope.saving = true;
        isolatedScope.$digest();
        expect(element.find('.save .fa-spinner').hasClass('ng-hide')).toEqual(false);
      });

      it('hides the spinner when not saving', function(){
        isolatedScope.saving = false;
        isolatedScope.$digest();
        expect(element.find('.save .fa-spinner').hasClass('ng-hide')).toEqual(true);
      });

    });

    describe('#save', function() {
      it('saves report_takeaway to assessment', function() {
        $httpBackend.expectPUT('/v1/assessments/5', {"id":5,"report_takeaway":"expected report"})
          .respond({});

        isolatedScope.save({id: 5, report_takeaway: 'expected report'});
        $httpBackend.flush();
      });

      it('sets saving to true', function(){
        isolatedScope.saving = false;
        isolatedScope.save({id: 1});

        expect(isolatedScope.saving).toEqual(true);
      });

      it('remove the view form editing state', function(){
        isolatedScope.editing = true;

        isolatedScope.save({id: 1});
        $httpBackend.expectPUT('/v1/assessments/1').respond({});

        $httpBackend.flush();
        expect(isolatedScope.editing).toEqual(false);
      });

      it('sets saving to false after request', function() {

        isolatedScope.saving = true;
        isolatedScope.save({id: 1});
        $httpBackend.expectPUT('/v1/assessments/1').respond({});

        $httpBackend.flush();
        expect(isolatedScope.saving).toEqual(false);
      });

    });
});
