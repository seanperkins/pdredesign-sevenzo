(function() {
  'use strict';

  describe('EntityService', function() {
    var service;
    beforeEach(function() {
      module('PDRClient');
      inject(function($injector) {
        service = $injector.get('EntityService');
      });
    });

    describe('#roundNumber', function() {
      it('rounds down to the nearest integer', function() {
        expect(service.roundNumber(50.999)).toEqual(50);
      });
    });

    describe('#draftStatusIcon', function() {
      var result;

      describe('when the entity does not have access', function() {
        beforeEach(function() {
          result = service.draftStatusIcon({has_access: false});
        });

        it('returns fa-minus-circle', function() {
          expect(result).toEqual('fa-minus-circle');
        });
      });

      describe('when the entity has access', function() {
        beforeEach(function() {
          result = service.draftStatusIcon({has_access: true});
        });

        it('returns fa-eye', function() {
          expect(result).toEqual('fa-eye');
        });
      });
    });

    describe('#completedStatusIcon', function() {
      var result;
      describe('when there is no consensus', function() {
        var entity = {};
        beforeEach(function() {
          result = service.completedStatusIcon(entity);
        });

        it('returns fa-spinner', function() {
          expect(result).toEqual('fa-spinner');
        });
      });

      describe('when the consensus has not been completed', function() {
        var entity = {
          consensus: {
            is_completed: false
          }
        };
        beforeEach(function() {
          result = service.completedStatusIcon(entity);
        });

        it('returns fa-spinner', function() {
          expect(result).toEqual('fa-spinner');
        });
      });

      describe('when the consensus has been completed', function() {
        var entity = {
          consensus: {
            is_completed: true
          }
        };
        beforeEach(function() {
          result = service.completedStatusIcon(entity);
        });

        it('returns fa-check', function() {
          expect(result).toEqual('fa-check');
        });
      });
    })
  });
})();