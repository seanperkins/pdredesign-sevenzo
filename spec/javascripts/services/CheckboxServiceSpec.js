(function () {
  'use strict';
  describe('Service: CheckboxService', function() {
    var subject,
        scope,
        property;

    beforeEach(function () {
      module('PDRClient');
      inject(function($rootScope, $injector) {
        subject = $injector.get('CheckboxService');
        scope = $rootScope.$new(true);

        property = {};
        subject.checkboxize(
          scope,
          'selectedItems',
          {key1: 'Value 1', key2: 'Value 2', key3: 'Value 3'},
          property,
          'key'
        );
      });
    });

    it('creates array of selected items in $scope', function() {
      expect(scope.selectedItems).toEqual([
        {name: 'Value 1', selected: false},
        {name: 'Value 2', selected: false},
        {name: 'Value 3', selected: false}
      ]);
    });

    it('watches for changes and reacts to them', function() {
      scope.selectedItems[0].selected = true;
      scope.selectedItems[2].selected = true;
      scope.$digest();

      expect(scope.selectedItems).toEqual([
        {name: 'Value 1', selected: true},
        {name: 'Value 2', selected: false},
        {name: 'Value 3', selected: true}
      ]);

      expect(property['key']).toEqual(['Value 1', 'Value 3']);
    });
  });
})();
