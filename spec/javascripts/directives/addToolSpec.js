describe('Directive: addTool', function() {
  var $scope, $timeout, $httpBackend, $compile;
  var element, SessionService, isolatedScope;
  beforeEach(module('PDRClient'));

    beforeEach(inject(function($injector, $compile) {
      SessionService  = $injector.get('SessionService');
      $timeout        = $injector.get('$timeout');
      $rootScope      = $injector.get('$rootScope');
      $compile        = $injector.get('$compile');
      $q              = $injector.get('$q');
      $httpBackend    = $injector.get('$httpBackend');
      $scope          = $rootScope.$new();
      $scope.category = {id: 2, name: "Current State Analysis"};
      element = angular.element('<add-tool category="category"></add-tool>');

      $compile(element)($scope);
      $scope.$digest();

      isolatedScope = element.isolateScope();
    }));

    it('sets the category_id correctly', function() {
      expect(isolatedScope.category.id).toEqual(2);
    });

    it('sets the category name correctly', function() {
      expect(isolatedScope.category.name).toEqual("Current State Analysis");
    });

    describe('#create', function(){
      it('posts to the api', function() {
        isolatedScope.showAddToolModal()
        var tool = {};
        $httpBackend.expectPOST('/v1/tools',
            {tool_category_id: 2})
        .respond({});
        isolatedScope.create(tool);
        $httpBackend.flush();
      });
    });

    describe('#showAddToolModal', function(){
      it('opens the modal', function() {
        expect(isolatedScope.modalInstance).toEqual(undefined);
        isolatedScope.showAddToolModal();
        expect(isolatedScope.modalInstance).not.toEqual(undefined);
      });
    });

});
