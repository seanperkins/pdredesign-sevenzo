(function() {
  'use strict';
  describe('Controller: AddInventoryUsers', function() {
    var $httpBackend,
        $stateParams,
        subject;

    beforeEach(function() {
      module('PDRClient');
      inject(function($injector, $controller) {
        $httpBackend = $injector.get('$httpBackend');
        $stateParams = {id: 4};

        subject = $controller('AddInventoryUsersCtrl', {
          $stateParams: $stateParams
        });

        $httpBackend.when('GET', '/v1/inventories/4/invitables').respond([]);
      });
    });

    it('retrieves initial invitables', function() {
      $httpBackend.expectGET('/v1/inventories/4/invitables').respond([]);
      expect($httpBackend.flush).not.toThrow();
    });

    describe('#addUser', function() {
      var $rootScope,
          $q,
          InventoryParticipant;

      beforeEach(function() {
        inject(function(_$rootScope_, _$q_, $injector) {
          $rootScope = _$rootScope_;
          $q = _$q_;
          InventoryParticipant = $injector.get('InventoryParticipant');
        });

        spyOn(subject, 'loadInvitables').and.callThrough();
        spyOn(InventoryParticipant, 'create').and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve();
          return {$promise: deferred.promise};
        });

        subject.addUser({id: 50});
        $rootScope.$apply();
      });

      it('creates participant', function() {
        expect(InventoryParticipant.create).toHaveBeenCalledWith({inventory_id: 4}, {user_id: 50});
      });

      it('reloads participants', function() {
        expect(subject.loadInvitables).toHaveBeenCalled();
      });
    });
  });
})();
