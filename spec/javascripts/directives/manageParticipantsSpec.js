describe('Directive: manageParticipants', function() {
  var $scope,
      $compile,
      $timeout,
      $modal,
      $q,
      element,
      Participant,
      isolatedScope;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector, $rootScope) {
    $compile = $injector.get('$compile');
    $q       = $injector.get('$q');
    $timeout = $injector.get('$timeout');
    $modal   = $injector.get('$modal');
    $scope   = $rootScope.$new();

    Participant = $injector.get('Participant');
    element     = angular.element('<manage-participants data-assessment-id=1></manage-participants>');
    timeout     = $timeout;

    $compile(element)($scope);

    $scope.$digest();
    isolatedScope = element.isolateScope();
  }));

  it('shows the right modal when showing', function(){
    spyOn($modal, 'open')
      .and.callFake(function(params){
        expect(params.templateUrl)
          .toEqual('client/views/modals/manage_participants.html');

        expect(params.size).toEqual('lg');
      });

    isolatedScope.showAddParticipants();
    expect($modal.open).toHaveBeenCalled();
  });

  it('calls update with the correct assessment id', function(){
    spyOn(Participant, 'all');

    isolatedScope.updateParticipants();
    expect(Participant.all).toHaveBeenCalledWith({assessment_id: '1'});
  });

  it('does set :send_invite when attribute is not set', function() {
    spyOn(Participant, 'save').and.callFake(function(params, user) {
      var deferred = $q.defer();
      deferred.resolve({});
      expect(params).toEqual({assessment_id: '1'});
      expect(user).toEqual({user_id: 8, send_invite: false});
      return {$promise: deferred.promise};
    });

    isolatedScope.addParticipant({id: 8});
  });

  it('sends :send_invite when attribute is set', function() {
    spyOn(Participant, 'save').and.callFake(function(params, user) {
      var deferred = $q.defer();
      deferred.resolve({});
      expect(params).toEqual({assessment_id: '1'});
      expect(user).toEqual({user_id: 8, send_invite: true});
      return {$promise: deferred.promise};
    });


    e = angular.element('<manage-participants send-invite="true" data-assessment-id=1></manage-participants>');
    $compile(e)($scope);

    $scope.$digest();
    scope = e.isolateScope();
    scope.$digest();

    scope.addParticipant({id: 8});
    expect(Participant.save).toHaveBeenCalled();
  });

  it('saves a participant when adding', function() {
      spyOn(Participant, 'save').and.callFake(function(params, user) {
        var deferred = $q.defer();
        deferred.resolve({});
        expect(params).toEqual({assessment_id: '1'});
        expect(user).toEqual({user_id: 8, send_invite: false});
        return {$promise: deferred.promise};
      });

    isolatedScope.addParticipant({id: 8});
    expect(Participant.save).toHaveBeenCalled();
  });


  describe('#humanPermissionName', function(){
    it('it converts an empty string to None', function() {
      expect(isolatedScope.humanPermissionName("")).toEqual("None");
    });

    it('returns the string as itself', function() {
      expect(isolatedScope.humanPermissionName("Human")).toEqual("Human");
    });
  });


  describe('#performPermissionsAction', function(){
    it('calls the given function', function(){
      this.performExample = function(){ }

      spyOn(this, 'performExample').and.callFake(function() {
        var deferred = $q.defer();
        deferred.resolve(true);

        return {$promise: deferred.promise};

      });

      var output = isolatedScope.performPermissionsAction(this.performExample);
      expect(this.performExample).toHaveBeenCalled();

    });
  });

});
