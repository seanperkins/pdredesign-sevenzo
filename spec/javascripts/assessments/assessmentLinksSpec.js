(function () {
  'use strict';

  describe('Directive: assessmentLinks', function () {
    var element,
      isolatedScope,
      AccessRequest,
      $scope,
      $compile,
      $timeout,
      $location,
      $q,
      $httpBackend;

    beforeEach(module('PDRClient'));
    beforeEach(inject(function ($rootScope, $injector) {
      $scope = $rootScope.$new({});
      $compile = $injector.get('$compile');
      $q = $injector.get('$q');
      $timeout = $injector.get('$timeout');
      $location = $injector.get('$location');
      $httpBackend = $injector.get('$httpBackend');
      AccessRequest = $injector.get('AccessRequest');

      $scope.link = {
        title: "Report",
        active: false,
        type: "report"
      };

      $scope.assessment = {
        id: 1
      };

      $scope.role = "network_partner";

      element = angular.element('<assessment-links'
        + ' title="{{link.title}}"'
        + ' active="{{link.active}}"'
        + ' type="{{link.type}}"'
        + ' id="{{assessment.id}}"'
        + ' consensus-id="25"'
        + ' role="{{role}}">'
        + ' </assessment-links>');

      $compile(element)($scope);
      $scope.$digest();

      isolatedScope = element.isolateScope();
    }));

    describe('#gotoLocation', function () {
      it('calls createConsensusModal', function () {
        spyOn(isolatedScope.vm, 'createConsensusModal');

        isolatedScope.vm.gotoLocation('/assessments/123/consensus');
        expect(isolatedScope.vm.createConsensusModal).toHaveBeenCalled();
      });

      it('calls requestAccess', function () {
        spyOn(isolatedScope.vm, 'requestAccess');

        isolatedScope.vm.gotoLocation('request_access');
        expect(isolatedScope.vm.requestAccess).toHaveBeenCalled();
      });

      it('goes to location', function () {
        spyOn($location, 'url');

        isolatedScope.vm.gotoLocation('xyz');
        expect($location.url).toHaveBeenCalledWith('xyz');
      });
    });

    describe('#assessmentLink', function () {
      it('returns request_access when request_access is param', function () {
        expect(isolatedScope.vm.assessmentLink('request_access')).toEqual('request_access');
      });

      it('returns a create consensus link', function () {
        isolatedScope.id = 42;
        var route = isolatedScope.vm.assessmentLink('response', true);
        expect(route).toEqual('/assessments/42/responses');
      });
    });

    describe('#redirectToCreateConsensus', function () {
      beforeEach(function () {
        isolatedScope.vm.modal = {
          dismiss: function () {
          }
        };
      });
      it('redirects to create conseusus URL', function () {
        spyOn($location, 'url');

        isolatedScope.vm.redirectToCreateConsensus();
        expect($location.url).toHaveBeenCalledWith('/assessments/1/consensus');
      });
    });

    describe('#popoverContent', function () {
      it('returns district members content', function () {
        spyOn(isolatedScope.vm, 'isNetworkPartner').and.returnValue(false);
        isolatedScope.vm.districtMemberPopoverContent = "district member content";
        expect(isolatedScope.vm.popoverContent()).toEqual('district member content');
      });

      it('returns network partner content', function () {
        spyOn(isolatedScope.vm, 'isNetworkPartner').and.returnValue(true);
        isolatedScope.vm.networkPartnerPopoverContent = "network partner content";
        expect(isolatedScope.vm.popoverContent()).toEqual('network partner content');
      });
    });

    describe('#submitAccessRequest', function () {
      it('calls AccessRequest#save', function () {
        isolatedScope.vm.accessLevel = '1';
        isolatedScope.vm.modal = {
          dismiss: function () {
          }
        };

        $httpBackend.expect('POST', '/v1/assessments/1/access_request', {"roles": ['1']})
          .respond(201, {});

        isolatedScope.vm.submitAccessRequest();
        $httpBackend.flush();

      });
    });

    it('hides the link if the link is null', function () {
      expect(element.find('a.link').hasClass('ng-hide'))
        .toBe(false);

      isolatedScope.title = null;
      isolatedScope.$digest();

      expect(element.find('a.link').hasClass('ng-hide'))
        .toBe(true);
    });
  });
})();
