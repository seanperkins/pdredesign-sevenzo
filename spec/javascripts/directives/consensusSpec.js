(function () {
  'use strict';

  describe('Directive: consensus', function () {
    var compile,
      rootScope,
      element;

    beforeEach(module('templates'));
    beforeEach(module('PDRClient', function ($provide) {
      $provide.factory('categoryContainerDirective', function () {
        return {};
      });

      $provide.factory('sortByDirective', function () {
        return {};
      });

      $provide.factory('varianceCategoryContainerDirective', function () {
        return {};
      });
    }));

    beforeEach(inject(function (_$compile_, _$rootScope_) {
      compile = _$compile_;
      rootScope = _$rootScope_;
    }));

    describe('when the question type is declared to be assessment', function () {
      var template = '<consensus question-type="assessment"></consensus>';

      beforeEach(function () {
        element = compile(template)(rootScope);
        rootScope.$digest();
      });

      describe('at all times', function () {

        it('includes the sortBy directive', function () {
          expect(element.find('sort-by').length).toEqual(1);
        });

        it('includes the team role select element', function () {
          var selectElement = element.find('select');
          expect(selectElement[0].id).toEqual('status');
        });

        it('has the "All" option selected', function () {
          var selectElement = element.find('select');
          expect(selectElement.find('option')[0].attributes['selected']).not.toBeUndefined();
        });

        describe('when selecting multiple team roles', function () {
          beforeEach(function () {
            var scope = element.isolateScope();
            scope.vm.teamRoles = ['foo', 'bar', 'baz', 'bing', 'boof'];
            rootScope.$digest();
          });

          it('displays all available roles', function () {
            // One additional element for the default "All"
            expect(element.find('option').length).toEqual(6);
          });
        });

        describe('when vm.isLoading returns false', function () {
          beforeEach(function () {
            var scope = element.isolateScope();
            scope.vm.loading = false;
            rootScope.$digest();
          });

          it('does not contain the loading element', function () {
            expect(element.find('.fa-spinner').length).toEqual(0);
          });
        });

        describe('when vm.isLoading returns true', function () {
          beforeEach(function () {
            var scope = element.isolateScope();
            scope.vm.loading = true;
            rootScope.$digest();
          });

          it('contains the loading element', function () {
            expect(element.find('.fa-spinner').length).toEqual(1);
          });
        });
      });

      describe('when the display mode is set to "category"', function () {
        beforeEach(function () {
          var scope = element.isolateScope();
          scope.vm.displayMode = 'category';
          rootScope.$digest();
        });

        it('includes the category container directive', function () {
          expect(element.find('category-container').length).toEqual(1);
        });

        it('does not include the varianceCategoryContainer directive', function () {
          expect(element.find('variance-category-container').length).toEqual(0);
        });

      });

      describe('when the display mode is set to "variance"', function () {
        beforeEach(function () {
          var scope = element.isolateScope();
          scope.vm.displayMode = 'variance';
          rootScope.$digest();
        });

        it('does not include the category container directive', function () {
          expect(element.find('category-container').length).toEqual(0);
        });

        it('includes the varianceCategoryContainer directive', function () {
          expect(element.find('variance-category-container').length).toEqual(1);
        });
      });


    });

    describe('when the question type is declared to be analysis', function () {
      var template = '<consensus question-type="analysis"></consensus>';

      beforeEach(function () {
        element = compile(template)(rootScope);
        rootScope.$digest();
      });

      describe('at all times', function () {

        it('does not includes the sortBy directive', function () {
          expect(element.find('sort-by').length).toEqual(0);
        });

        it('does not include the team role select element', function () {
          expect(element.find('select').length).toEqual(0);
        });
      });

      describe('when the display mode is set to "category"', function () {
        beforeEach(function () {
          var scope = element.isolateScope();
          scope.vm.displayMode = 'category';
          rootScope.$digest();
        });

        it('includes the category container directive', function () {
          expect(element.find('category-container').length).toEqual(1);
        });

        it('does not include the varianceCategoryContainer directive', function () {
          expect(element.find('variance-category-container').length).toEqual(0);
        });

      });
    });
  });
})();
