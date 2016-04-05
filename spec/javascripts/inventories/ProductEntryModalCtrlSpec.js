(function() {
  'use strict';

  describe('Controller: ProductEntryModal', function() {
    var subject,
        $scope,
        ProductEntry,
        ConstantsService;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$rootScope_, _$controller_, $injector) {
        ProductEntry = $injector.get('ProductEntry');
        ConstantsService = $injector.get('ConstantsService');
        $scope = _$rootScope_.$new(true);
        $scope.inventory = {id: 1};
      });
    });

    describe('with mock request', function() {
      var $httpBackend;
      beforeEach(function() {
        inject(function(_$httpBackend_) {
          $httpBackend = _$httpBackend_;
          $httpBackend.expectGET('/v1/constants/product_entry')
                      .respond({
                        constants: {
                          general_inventory_question: {},
                          product_question: {},
                          technical_question: {}
                        }
                      });
          ConstantsService.get('product_entry');
          $httpBackend.flush();
        });
      });

      it('creates a ProductEntry', function() {
        inject(function(_$rootScope_, _$controller_, $injector) {
          subject = _$controller_('ProductEntryModalCtrl', {
            $scope: $scope,
            ProductEntry: ProductEntry,
            ConstantsService: ConstantsService
          });
        });

        $httpBackend
            .expectPOST('/v1/inventories/1/product_entries', {
              general_inventory_question_attributes: {},
              product_question_attributes: {},
              usage_question_attributes: {},
              technical_question_attributes: {}
            })
            .respond({});

        subject.save();
        $httpBackend.flush();
      });

      it('updates a ProductEntry', function() {
        inject(function(_$rootScope_, _$controller_, $injector) {
          $scope.resource = {
            id: 1,
            general_inventory_question: {
              product_name: 'Product Name'
            },
            product_question: {},
            usage_question: {},
            technical_question: {}
          }

          subject = _$controller_('ProductEntryModalCtrl', {
            $scope: $scope,
            ProductEntry: ProductEntry,
            ConstantsService: ConstantsService
          });
        });

        $httpBackend
            .expectPUT('/v1/inventories/1/product_entries/1', {
              id: 1,
              general_inventory_question_attributes: {
                product_name: 'Product Name'
              },
              product_question_attributes: {},
              usage_question_attributes: {},
              technical_question_attributes: {}
            })
            .respond({});

        subject.save();
        $httpBackend.flush();
      });

      it('closes the modal', function() {
        inject(function(_$rootScope_, _$controller_, $injector) {
          subject = _$controller_('ProductEntryModalCtrl', {
            $scope: $scope,
            ProductEntry: ProductEntry,
            ConstantsService: ConstantsService
          });
        });

        spyOn(subject, 'closeModal');
        $httpBackend
            .expectPOST('/v1/inventories/1/product_entries')
            .respond({});

        subject.save();
        $httpBackend.flush();
        expect(subject.closeModal).toHaveBeenCalled();
      });
    });
  });
})();
