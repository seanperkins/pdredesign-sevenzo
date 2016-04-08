(function() {
  'use strict';

  describe('Controller: AddInventoryUsersLink', function() {
    var subject,
        $scope,
        $q,
        $stateParams,
        InventoryParticipant;

    beforeEach(function() {
      module('PDRClient');
      inject(function($injector, $controller, $rootScope) {
        $scope = $rootScope.$new(true);
        InventoryParticipant = $injector.get('InventoryParticipant');
        spyOn(InventoryParticipant, 'all').and.callFake(function() {
          var deferred = $q.defer();
          deferred.resolve([{}, {}]);
          return { $promise: deferred.promise };
        });

        $q = $injector.get('$q');

        $stateParams = {id: 4};

        subject = $controller('AddInventoryUsersLinkCtrl', {
          $scope: $scope,
          $stateParams: $stateParams
        });
      });
    });

    describe('#loadInvitables', function() {
      beforeEach(function() {
        subject.loadInvitables();
      });

      it('loads invitables user for the inventory', function() {
        expect(InventoryParticipant.all).toHaveBeenCalledWith({inventory_id: 4});
      });

      it('sets invitables', function() {
        expect(subject.invitables.$promise).not.toBe(null);
      });
    });

    describe('#invitablesFound', function() {
      it('false when invitables are null', function() {
        subject.invitables = null;
        expect(subject.invitablesFound()).toBeFalsy();
      });

      it('false when invitables are empty', function() {
        subject.invitables = [];
        expect(subject.invitablesFound()).toBe(false);
      });

      it('true when invitables are not empty', function() {
        subject.invitables = [{}];
        expect(subject.invitablesFound()).toBe(true);
      });
    });
  });
})();
