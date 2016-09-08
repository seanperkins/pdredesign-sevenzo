(function () {
  'use strict';

  describe('Directive: consensus', function () {
    var compile, rootScope;

    beforeEach(module('PDRClient'));
    beforeEach(module('templates'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      compile = _$compile_;
      rootScope = _$rootScope_;
    }));

    describe('on initialization', function () {
      describe('when the question type is declared to be assessment', function () {
        var template = '<consensus question-type="assessment"></consensus>',
          element,
          isolateScope,
          viewModel;


        beforeEach(function () {
          element = compile(template)(rootScope);
          rootScope.$digest();
          isolateScope = element.isolateScope();
          viewModel = isolateScope.vm;
        });

        it('sets the question type appropriately', function () {
          expect(isolateScope.questionType).toEqual('assessment');
        });

        it('defines its display mode as category', function () {
          expect(viewModel.displayMode).toEqual('category');
        });

        it('defines isConsensus as true', function () {
          expect(viewModel.isConsensus).toEqual(true)
        });

        it('defines initial loading state to false', function () {
          expect(viewModel.loading).toEqual(false);
        });

        describe('sort buttons', function () {
          it('includes the numeric sort button', function () {
            var numericButton = element.find('.fa-sort-numeric-asc').parent();
            expect(numericButton.text().trim()).toEqual('Numeric');
          });

          it('includes the variance sort button', function () {
            var varianceButton = element.find('.fa-bar-chart-o').parent();
            expect(varianceButton.text().trim()).toEqual('Variance');
          });
        });

        describe('filter selection', function () {
          var selectElement;

          beforeEach(function () {
            selectElement = element.find('select');
          });

          it('includes the team role select element', function () {
            expect(selectElement[0].id).toEqual('status');
          });

          it('has the "All" option selected', function () {
            expect(selectElement.find('option')[0].attributes['selected']).not.toBeUndefined();
          });
        });





      });
    });
  });
})();

