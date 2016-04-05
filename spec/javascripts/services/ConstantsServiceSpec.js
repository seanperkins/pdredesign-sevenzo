(function () {
  'use strict';
  describe('Service: ConstantsService', function() {
    var subject,
        $httpBackend;

    beforeEach(function () {
      module('PDRClient');
      inject(function($rootScope, $injector) {
        subject = $injector.get('ConstantsService');
        $httpBackend = $injector.get('$httpBackend');
      });
    });

    it('gets and populates constant collection', function() {
      $httpBackend.expectGET('/v1/constants/product_entry')
                  .respond({
                    constants: {
                      foo: 'bar'
                    }
                  });

      subject.get('product_entry');
      $httpBackend.flush();

      expect(subject.constants).toEqual({
        product_entry: {
          foo: 'bar'
        }
      });
    });
  });
})();
