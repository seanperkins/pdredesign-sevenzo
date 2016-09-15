(function () {
  'use strict';

  describe('Service: InvitationService', function () {
    var subject,
      $httpBackend,
      Invitation;

    beforeEach(function () {
      module('PDRClient');
      inject(function (_InvitationService_, _$httpBackend_, _Invitation_) {
        subject = _InvitationService_;
        $httpBackend = _$httpBackend_;
        Invitation = _Invitation_;
      });
    });

    describe('#saveInvitation', function () {
      var token = 'test-token',
        invite = {foo: 'bar'};

      beforeEach(function () {
        $httpBackend.expectPOST('/v1/invitations/test-token', invite).respond({});
        subject.saveInvitation(token, invite);
      });

      it('invokes Invitation#save', function () {
        expect($httpBackend.flush).not.toThrow();
      });

      afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
      });
    });

    describe('#getInvitedUser', function () {
      var token = 'test-token';

      beforeEach(function () {
        $httpBackend.expectGET('/v1/invitations/test-token').respond({});
        subject.getInvitedUser(token);
      });

      it('successfully makes the request', function () {
        expect($httpBackend.flush).not.toThrow();
      });

      afterEach(function () {
        $httpBackend.verifyNoOutstandingRequest();
        $httpBackend.verifyNoOutstandingExpectation();
      });
    });
  });
})();