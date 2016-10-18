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


    xit('gets an emails body from the api endpoint', function () {
      $httpBackend.expectGET('/v1/assessments/1/participants/1/mail').respond('expected body');
      var request = isolatedScope.vm.getEmailBody();
      request.then(function (response) {
        expect(response.data).toEqual('expected body');
      });

      $httpBackend.flush();
    });

    xit('redirects to a mailto link', function () {
      $httpBackend.expectGET('/v1/assessments/1/participants/1/mail').respond('expected body');
      spyOn(isolatedScope.vm, 'triggerMailTo');
      isolatedScope.vm.sendEmail();
      $httpBackend.flush();

      var expectedLink = "mailto:user@example.com?subject=Invitation&body=expected%20body";
      expect(isolatedScope.vm.triggerMailTo).toHaveBeenCalledWith(expectedLink);
    });
  });
})();
