(function () {
  'use strict';

  describe('Directive: responseStatus', function () {
    var $scope,
      $compile,
      $httpBackend,
      element;

    beforeEach(function () {
      module('PDRClient');
      inject(function (_$compile_, _$rootScope_, _$httpBackend_) {
        $compile = _$compile_;
        $scope = _$rootScope_.$new(true);
        $httpBackend = _$httpBackend_;
      });
    });

    describe('when the user status is set to invited', function () {
      beforeEach(function () {
        $scope.user = {
          assessment_id: 1,
          participant_id: 1,
          status: 'invited',
          status_human: 'Invited',
          email: 'user@example.com'
        };

        element = angular.element('<response-status user="user"></response-status>');
        $compile(element)($scope);
        $scope.$digest();
      });

      it('shows the link', function () {
        expect(element.find('a').length).toEqual(1);
      });

      it('binds the human status value', function () {
        expect(element.find('a').text()).toEqual('Invited');
      });

      it('binds the appropriate endpoint URL', function () {
        expect(element.isolateScope().vm.endpoint()).toEqual('/v1/assessments/1/participants/1/mail');
      });

      describe('when the tool is an assessment', function () {
        describe('when the user clicks the email link', function () {
          var vm;

          beforeEach(function () {
            vm = element.isolateScope().vm;
            spyOn(vm, 'triggerMailTo');
            $httpBackend.expectGET('/v1/assessments/1/participants/1/mail').respond('expected body <b>with elements&stuff</b>');
            element.find('a').trigger('click');
            $httpBackend.flush();
          });

          it('invokes the window redirection', function () {
            expect(vm.triggerMailTo).toHaveBeenCalledWith('mailto:user@example.com?subject=Invitation&body=expected%20body%20%3Cb%3Ewith%20elements%26stuff%3C%2Fb%3E');
          });
        });
      });
    });

    describe('when the user status is not set to invited', function () {
      beforeEach(function () {
        $scope.user = {
          assessment_id: 1,
          participant_id: 1,
          status: 'pending',
          status_human: 'Pending',
          email: 'user@example.com'
        };

        element = angular.element('<response-status user="user"></response-status>');
        $compile(element)($scope);
        $scope.$digest();
      });

      it('does not show a link', function () {
        expect(element.find('a').length).toEqual(0);
      });

      it('binds the human status value', function () {
        expect(element.find('.user-status').text().trim()).toEqual('Pending');
      });
    });
  });
})();
