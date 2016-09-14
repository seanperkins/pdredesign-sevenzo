(function () {
  'use strict';

  describe('Resource: Invitation', function () {
    var subject,
      $httpBackend;

    beforeEach(function () {
      module('PDRClient');
      inject(function (_Invitation_, _$httpBackend_) {
        subject = _Invitation_;
        $httpBackend = _$httpBackend_;
      });
    });

    it('uses the correct URL', function () {
      $httpBackend.expectGET('/v1/invitations/test-token').respond({});
      subject.get({token: 'test-token'});
      expect($httpBackend.flush).not.toThrow();
    });
  });
})();