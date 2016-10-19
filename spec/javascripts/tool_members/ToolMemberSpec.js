(function () {
  'use strict';

  describe('Resource: ToolMember', function () {
    var $httpBackend,
      subject;

    beforeEach(function () {
      module('PDRClient');
      inject(function (_$httpBackend_, _ToolMember_) {
        $httpBackend = _$httpBackend_;
        subject = _ToolMember_;
      });
    });

    describe('#create', function () {
      beforeEach(function () {
        $httpBackend.expectPOST('/v1/tool_members').respond({});
        subject.create({tool_type: 'Foo', tool_id: '1'});
      });

      it('invokes the correct URL', function () {
        expect($httpBackend.flush).not.toThrow();
      });

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
      });
    });

    describe('#grant', function () {
      beforeEach(function () {
        $httpBackend.expectPOST('/v1/tool_members/tool_type/Foo/tool_id/1/access_request/3/grant').respond({});
        subject.grant({tool_type: 'Foo', tool_id: '1', id: '3'});
      });

      it('invokes the correct URL', function () {
        expect($httpBackend.flush).not.toThrow();
      });

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
      });
    });

    describe('#deny', function () {
      beforeEach(function () {
        $httpBackend.expectPOST('/v1/tool_members/tool_type/Foo/tool_id/1/access_request/3/deny').respond({});
        subject.deny({tool_type: 'Foo', tool_id: '1', id: '3'});
      });

      it('invokes the correct URL', function () {
        expect($httpBackend.flush).not.toThrow();
      });

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
      });
    });

    describe('#revoke', function () {
      beforeEach(function () {
        $httpBackend.expectDELETE('/v1/tool_members/12').respond({});
        subject.revoke({id: '12'});
      });

      it('invokes the correct URL', function () {
        expect($httpBackend.flush).not.toThrow();
      });

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
      });
    });

    describe('#requestAccess', function () {
      beforeEach(function () {
        $httpBackend.expectPOST('/v1/tool_members/tool_type/Foo/tool_id/12/request_access').respond({});
        subject.requestAccess({tool_type: 'Foo', tool_id: '12'});
      });

      it('invokes the correct URL', function () {
        expect($httpBackend.flush).not.toThrow();
      });

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
      });
    });

    describe('#invitableMembers', function () {
      beforeEach(function () {
        $httpBackend.expectGET('/v1/tool_members/tool_type/Foo/tool_id/12/invitable_members').respond([]);
        subject.invitableMembers({tool_type: 'Foo', tool_id: '12'});
      });

      it('invokes the correct URL', function () {
        expect($httpBackend.flush).not.toThrow();
      });

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
      });
    });

    describe('#permissionRequests', function () {
      beforeEach(function () {
        $httpBackend.expectGET('/v1/tool_members/tool_type/Foo/tool_id/12/permission_requests').respond([]);
        subject.permissionRequests({tool_type: 'Foo', tool_id: '12'});
      });

      it('invokes the correct URL', function () {
        expect($httpBackend.flush).not.toThrow();
      });

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
      });
    });

    describe('#showAll', function () {
      beforeEach(function () {
        $httpBackend.expectGET('/v1/tool_members/tool_type/Foo/tool_id/12/all').respond([]);
        subject.showAll({tool_type: 'Foo', tool_id: '12'});
      });

      it('invokes the correct URL', function () {
        expect($httpBackend.flush).not.toThrow();
      });

      afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
      });
    });
  });
})();