(function() {
  'use strict';
  describe('Controller: ManageInventoryAccessRequests', function() {
    var $scope, $q, subject, InventoryAccessRequest;

    beforeEach(function() {
      module('PDRClient');
      inject(function($injector, $controller, $rootScope) {
        $scope = $rootScope.$new(true);
        InventoryAccessRequest = $injector.get('InventoryAccessRequest');
        $q = $injector.get('$q');

        $scope.inventoryId = 4

        spyOn(InventoryAccessRequest, 'list').and.callFake(function(query, params) {
          var deferred = $q.defer();
          deferred.resolve([{}, {}]);
          return { $promise: deferred.promise };
        });

        spyOn(InventoryAccessRequest, 'update').and.callFake(function(query, params) {
          var deferred = $q.defer();
          deferred.resolve([{}, {}]);
          return { $promise: deferred.promise };
        });

        subject = $controller('ManageInventoryAccessRequestsCtrl', {
          $scope: $scope
        });
      })
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
          spyOn(window, 'confirm').and.returnValue(true);
          subject.denyRequest(143);
        });

        it('updates request with status', function() {
          expect(InventoryAccessRequest.update).toHaveBeenCalledWith({ inventory_id: 4, id: 143}, { status: 'denied' });
        });
      });

      describe('canceling', function() {
        beforeEach(function() {
          spyOn(window, 'confirm').and.returnValue(false);
          subject.denyRequest(143);
        });

        it('does not updates request with status', function() {
          expect(InventoryAccessRequest.update).not.toHaveBeenCalledWith({ inventory_id: 4, id: 143}, { status: 'denied' });
        });
      });
    });
  });

  describe('#acceptRequest', function() {
    describe('confirming', function() {
      beforeEach(function() {
        spyOn(window, 'confirm').and.returnValue(true);
        subject.acceptRequest(143);
      });

      it('updates request with status', function() {
        expect(InventoryAccessRequest.update).toHaveBeenCalledWith({ inventory_id: 4, id: 143}, { status: 'accepted' });
      });
    });

    describe('canceling', function() {
      beforeEach(function() {
        spyOn(window, 'confirm').and.returnValue(false);
        subject.acceptRequest(143);
      });

      it('does not updates request with status', function() {
        expect(InventoryAccessRequest.update).not.toHaveBeenCalledWith({ inventory_id: 4, id: 143}, { status: 'accepted' });
      });
    });
  });
});
})();
