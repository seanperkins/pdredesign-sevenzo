(function() {
  'use strict';

  xdescribe('Controller: AddNewParticipants', function() {
    it('calls update with the correct assessment id', function() {
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
      var scope;
      spyOn(Participant, 'save').and.callFake(function(params, user) {
        var deferred = $q.defer();
        deferred.resolve({});
        expect(params).toEqual({assessment_id: '1'});
        expect(user).toEqual({user_id: 8, send_invite: true});
        return {$promise: deferred.promise};
      });


      var e = angular.element('<manage-participants send-invite="true" data-assessment-id=1></manage-participants>');
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


  })
})();