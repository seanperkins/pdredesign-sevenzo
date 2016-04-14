(function() {
  'use strict';
  describe('Controller: ManageInventoryAccessRequests', function() {
    var $scope,
        $q,
        $window,
        subject,
        InventoryAccessRequest;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$controller_, _$rootScope_, _$q_, _$window_, $injector) {
        $scope = _$rootScope_.$new(true);
        $q = _$q_;
        InventoryAccessRequest = $injector.get('InventoryAccessRequest');
        $window = _$window_;

        spyOn(InventoryAccessRequest, 'list').and.callFake(function(query, params) {
          var deferred = $q.defer();
          deferred.resolve([{}, {}]);
          return {$promise: deferred.promise};
        });

        spyOn(InventoryAccessRequest, 'update').and.callFake(function(query, params) {
          var deferred = $q.defer();
          deferred.resolve([{}, {}]);
          return {$promise: deferred.promise};
        });

        subject = _$controller_('ManageInventoryAccessRequestsCtrl', {
          $scope: $scope,
          $stateParams: {id: 4}
        });
      });
    });

    describe('#loadList', function() {
      beforeEach(function() {
        subject.loadList();
      });

      it('loads permissions for inventory', function() {
        expect(InventoryAccessRequest.list).toHaveBeenCalledWith({ inventory_id: 4});
      });

      it('sets list', function() {
        expect(subject.list.$promise).not.toBe(null);
      });
    });

    describe('#denyRequest', function() {
      describe('confirming', function() {
        beforeEach(function() {
          spyOn($window, 'confirm').and.returnValue(true);
          subject.denyRequest(143);
        });

        it('updates request with status', function() {
          expect(InventoryAccessRequest.update).toHaveBeenCalledWith({ inventory_id: 4, id: 143}, { status: 'denied' });
        });
      });

      describe('canceling', function() {
        beforeEach(function() {
          spyOn($window, 'confirm').and.returnValue(false);
          subject.denyRequest(143);
        });

        it('does not updates request with status', function() {
          expect(InventoryAccessRequest.update).not.toHaveBeenCalledWith({ inventory_id: 4, id: 143}, { status: 'denied' });
        });
      });
    });
    
    describe('#humanPermissionName', function(){
      it('it converts an empty string to None', function() {
        expect(subject.humanPermissionName("")).toEqual("None");
      });

      it('returns the string as itself', function() {
        expect(subject.humanPermissionName("Human")).toEqual("Human");
      });
    });

    describe('#acceptRequest', function() {
      describe('confirming', function() {
        beforeEach(function() {
          spyOn($window, 'confirm').and.returnValue(true);
          subject.acceptRequest(143);
        });

        it('updates request with status', function() {
          expect(InventoryAccessRequest.update).toHaveBeenCalledWith({ inventory_id: 4, id: 143}, { status: 'accepted' });
        });
      });

      describe('canceling', function() {
        beforeEach(function() {
          spyOn($window, 'confirm').and.returnValue(false);
          subject.acceptRequest(143);
        });

        it('does not updates request with status', function() {
          expect(InventoryAccessRequest.update).not.toHaveBeenCalledWith({ inventory_id: 4, id: 143}, { status: 'accepted' });
        });
      });
    });
  });
})();
