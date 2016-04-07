(function() {
  'use strict';

  describe('Controller: InventoryDataEntryModal', function() {
    var subject,
        $scope,
        DataEntry,
        ConstantsService;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_$rootScope_, _$controller_, $injector) {
        DataEntry = $injector.get('DataEntry');
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
          $httpBackend.expectGET('/v1/constants/data_entry')
                      .respond({
                        constants: {
                          general_data_question: {},
                          data_entry_question: {},
                          data_access_question: {}
                        }
                      });
          ConstantsService.get('data_entry');
          $httpBackend.flush();
        });
      });

      it('creates a DataEntry', function() {
        inject(function(_$rootScope_, _$controller_, $injector) {
          subject = _$controller_('InventoryDataEntryModalCtrl', {
            $scope: $scope,
            DataEntry: DataEntry,
            ConstantsService: ConstantsService
          });
        });

        $httpBackend
            .expectPOST('/v1/inventories/1/data_entries', {
              general_data_question_attributes: {},
              data_entry_question_attributes: {},
              data_access_question_attributes: {}
            })
            .respond({});

        subject.save();
        $httpBackend.flush();
      });

      it('updates a DataEntry', function() {
        inject(function(_$rootScope_, _$controller_, $injector) {
          $scope.resource = {
            id: 1,
            general_data_question: {
              point_of_contact_name: 'Name'
            },
            data_entry_question: {},
            data_access_question: {}
          }

          subject = _$controller_('InventoryDataEntryModalCtrl', {
            $scope: $scope,
            DataEntry: DataEntry,
            ConstantsService: ConstantsService
          });
        });

        $httpBackend
            .expectPUT('/v1/inventories/1/data_entries/1', {
              id: 1,
              general_data_question_attributes: {
                point_of_contact_name: 'Name'
              },
              data_entry_question_attributes: {},
              data_access_question_attributes: {}
            })
            .respond({});

        subject.save();
        $httpBackend.flush();
      });

      it('closes the modal', function() {
        inject(function(_$rootScope_, _$controller_, $injector) {
          subject = _$controller_('InventoryDataEntryModalCtrl', {
            $scope: $scope,
            DataEntry: DataEntry,
            ConstantsService: ConstantsService
          });
        });

        spyOn(subject, 'closeModal');
        $httpBackend
            .expectPOST('/v1/inventories/1/data_entries')
            .respond({});

        subject.save();
        $httpBackend.flush();
        expect(subject.closeModal).toHaveBeenCalled();
      });
    });
  });
})();
