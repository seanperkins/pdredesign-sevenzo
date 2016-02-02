describe('Directive: chooseRoleModal', function() {
  var element,
      isolatedScope,
      $scope,
      $modal,
      $compile;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($rootScope, $injector) {
    $scope   = $rootScope.$new({});
    $compile = $injector.get('$compile');
    $state   = $injector.get('$state');
    $modal   = $injector.get('$modal');
    element = angular.element("<div choose-role-modal></div>");
    $compile(element)($scope);
    $scope.$digest();
    isolatedScope = element.isolateScope();

  }));

    it('sets ng-click chooseRole on element', function(){
      expect(element.attr('ng-click')).toEqual('chooseRole()');
    });    

    describe('#chooseRole', function(){
      it('is called when element is clicked', function(){
        spyOn(isolatedScope, 'chooseRole');      
        element.click();
        expect(isolatedScope.chooseRole).toHaveBeenCalled();
      });    

      it('it opens a modal', function(){
        spyOn($modal, 'open');      
        element.click();
        expect($modal.open).toHaveBeenCalled();
      });
    });    
    
    it('#close dismisses modal', function(){
      element.click();
      spyOn(isolatedScope.modalInstance, 'dismiss');      
      isolatedScope.close();
      expect(isolatedScope.modalInstance.dismiss).toHaveBeenCalled();
    });    

});
