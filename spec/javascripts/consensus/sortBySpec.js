(function () {
  'use strict';

  describe('Directive: sortBy', function () {
    var compile,
      rootScope,
      template = '<sort-by></sort-by>',
      element;

    beforeEach(module('templates'));
    beforeEach(module('PDRClient'));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      compile = _$compile_;
      rootScope = _$rootScope_;
    }));

    beforeEach(function () {
      element = compile(template)(rootScope);
      rootScope.$digest();
    });

    describe('numeric sort button', function () {
      it('exists', function () {
        expect(element.find('#numericSort').length).toEqual(1);
      });

      it('binds the ng-click function with the right parameters', function () {
        expect(element.find('#numericSort')[0].attributes['ng-click'].value).toEqual("sortBy.changeViewMode('category')");
      });

      describe('when clicked', function () {
        var $scope,
          viewModel;

        beforeEach(function () {
          $scope = element.isolateScope();
          viewModel = element.isolateScope().sortBy;

          spyOn($scope, '$emit');
          viewModel.data = {
            categories: {
              name: 'One',
              questions: [
                {name: 'Foo', variance: 0},
                {name: 'Bar', variance: 0.5},
                {name: 'Baz', variance: 1}
              ]
            }
          };

          element.find('#numericSort').triggerHandler('click');
        });

        it('emits the event with the right data', function () {
          expect($scope.$emit).toHaveBeenCalledWith('updateCategory', {
            categories: {
              name: 'One',
              questions: [
                {name: 'Foo', variance: 0},
                {name: 'Bar', variance: 0.5},
                {name: 'Baz', variance: 1}
              ]
            }
          });
        });
      });
    });

    describe('variance sort button', function () {
      it('exists', function () {
        expect(element.find('#varianceSort').length).toEqual(1);
      });

      it('binds the ng-click function with the right parameters', function () {
        expect(element.find('#varianceSort')[0].attributes['ng-click'].value).toEqual("sortBy.changeViewMode('variance')");
      });

      describe('when clicked', function () {
        var $scope,
          viewModel;

        describe('when objects have no variance', function () {
          beforeEach(function () {
            $scope = element.isolateScope();
            viewModel = element.isolateScope().sortBy;

            viewModel.data = {
              categories: {
                name: 'One',
                questions: [
                  {name: 'Foo'},
                  {name: 'Bar', variance: 0.5},
                  {name: 'Baz'}
                ]
              }
            };
            spyOn($scope, '$emit');

            element.find('#varianceSort').triggerHandler('click');
          });

          it('emits the event with the right data', function () {
            expect($scope.$emit).toHaveBeenCalledWith('updateVariance', [
              {name: 'Bar', variance: 0.5},
              {name: 'Foo', variance: 0},
              {name: 'Baz', variance: 0}
            ]);
          });
        });

        describe('when objects have a variance', function () {
          beforeEach(function () {
            $scope = element.isolateScope();
            viewModel = element.isolateScope().sortBy;

            viewModel.data = {
              categories: {
                name: 'One',
                questions: [
                  {name: 'Foo', variance: 0.75},
                  {name: 'Bar', variance: 0.95},
                  {name: 'Baz', variance: 0.25}
                ]
              }
            };
            spyOn($scope, '$emit');

            element.find('#varianceSort').triggerHandler('click');
          });

          it('emits the event with the right data', function () {
            expect($scope.$emit).toHaveBeenCalledWith('updateVariance', [
              {name: 'Bar', variance: 0.95},
              {name: 'Foo', variance: 0.75},
              {name: 'Baz', variance: 0.25}
            ]);
          });
        })
      });
    });
  });
})();