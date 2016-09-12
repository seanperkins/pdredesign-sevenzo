(function () {
  'use strict';

  describe('Directive: sortBy', function () {
    var compile,
      rootScope,
      template = '<consensus-mock><sort-by></sort-by></consensus-mock>',
      element;

    beforeEach(module('templates'));
    beforeEach(module('PDRClient'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      compile = _$compile_;
      rootScope = _$rootScope_;
    }));

    beforeEach(function () {
      element = compile(template)(rootScope);
      element.data('$consensusCtrl', {});
      rootScope.$digest();
    });

    describe('numeric sort button', function () {
      it('exists', function () {
        expect(element.find('#numericSort').length).toEqual(1);
      });

      it('binds the ng-click function with the right parameters', function () {
        expect(element.find('#numericSort')[0].attributes['ng-click'].value).toEqual("sortBy.changeViewMode('category')");
      });
    });

    describe('variance sort button', function () {
      it('exists', function () {
        expect(element.find('#varianceSort').length).toEqual(1);
      });

      it('binds the ng-click function with the right parameters', function () {
        expect(element.find('#varianceSort')[0].attributes['ng-click'].value).toEqual("sortBy.changeViewMode('variance')");
      });
    });
  });
})();