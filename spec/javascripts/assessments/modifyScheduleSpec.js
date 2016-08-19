(function() {
  'use strict';

  describe('Directive: modifySchedule', function() {
    var element,
        $compile,
        isolateScope;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$compile_) {
        $compile = _$compile_;
      });
    });

    describe('on initialization', function() {
      var assessment = {};
      beforeEach(function() {
        inject(function(_$rootScope_) {
          var scope = _$rootScope_.$new(true);
          scope.assessment = assessment;
          element = angular.element('<modify-schedule assessment="assessment"></modify-schedule>');
          $compile(element)(scope);
          scope.$digest();
          isolateScope = element.isolateScope();
        });
      });

      it('sets the datetimepicker jQuery library on the due date', function() {
        expect(element.find('.due-date').datetimepicker).toBeDefined();
      });

      it('sets the datetimepicker jQuery library on the meeting date', function() {
        expect(element.find('.meeting-date').datetimepicker).toBeDefined();
      });
    });

    describe('when the assessment has a due date', function() {
      var assessment = {due_date: '11/20/2015'};
      beforeEach(function() {
        inject(function(_$rootScope_) {
          var scope = _$rootScope_.$new(true);
          scope.assessment = assessment;
          element = angular.element('<modify-schedule assessment="assessment"></modify-schedule>');
          $compile(element)(scope);
          scope.$digest();
          isolateScope = element.isolateScope();
        });
      });

      it('sets the due date', function() {
        expect(isolateScope.vm.modal_due_date).toEqual('11/20/2015');
      });
    });

    describe('when the assessment has a meeting date', function() {
      var assessment = {meeting_date: '11/20/2015'};
      beforeEach(function() {
        inject(function(_$rootScope_) {
          var scope = _$rootScope_.$new(true);
          scope.assessment = assessment;
          element = angular.element('<modify-schedule assessment="assessment"></modify-schedule>');
          $compile(element)(scope);
          scope.$digest();
          isolateScope = element.isolateScope();
        });
      });

      it('sets the meeting date', function() {
        expect(isolateScope.vm.modal_meeting_date).toEqual('11/20/2015');
      });
    });

    describe('#close', function() {
      var assessment = {};
      var closeSpy = jasmine.createSpy('closeSpy');
      beforeEach(function() {
        inject(function(_$rootScope_) {
          var scope = _$rootScope_.$new(true);
          scope.assessment = assessment;
          element = angular.element('<modify-schedule assessment="assessment"></modify-schedule>');
          $compile(element)(scope);
          scope.$digest();
          isolateScope = element.isolateScope();

          isolateScope.$parent = {
            $close: closeSpy
          };
        });
      });

      it('invokes the parent scope $close method', function() {
        isolateScope.close();
        expect(closeSpy).toHaveBeenCalled();
      });
    })
  });
})();