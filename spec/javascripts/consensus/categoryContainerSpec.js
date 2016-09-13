(function () {
  'use strict';

  describe('Directive: categoryContainer', function () {
    var element,
      rootScope,
      compile;

    beforeEach(module('templates'));
    beforeEach(module('PDRClient', function ($provide) {
      $provide.factory('questionContainerDirective', function () {
        return {};
      });
    }));

    beforeEach(inject(function (_$rootScope_, _$compile_) {
      rootScope = _$rootScope_;
      compile = _$compile_;
    }));

    describe('with no categories provided', function () {
      var template = '<category-container></category-container>';

      beforeEach(function () {
        element = compile(template)(rootScope);
        rootScope.$digest();
      });

      it('contains no children', function () {
        expect(element.children().length).toEqual(0);
      });
    });

    describe('with categories provided', function () {
      describe('with the question type set to assessment', function () {
        var template = '<category-container categories="categories" question-type="assessment" is-consensus="pass-thru" scores="scores"></category-container>';
        var categories = [{
          name: 'Foo',
          toggled: false
        }];

        beforeEach(function () {
          rootScope.categories = categories;
          element = compile(template)(rootScope);
          rootScope.$digest();
        });

        it('contains a question container entry', function () {
          expect(element.find('question-container').length).toEqual(1);
        });

        it('displays the category label', function () {
          expect(element.find('.category-label').length).toEqual(1);
        });

        it('displays the name of the category', function () {
          expect(element.find('.category-label').text().trim()).toEqual('Foo');
        });

        describe('when passing values to the question container directive', function () {
          it('passes the category along', function () {
            expect(element.find('question-container')[0].attributes['category'].value).toEqual('category')
          });

          it('passes the is-consensus value along', function () {
            expect(element.find('question-container')[0].attributes['is-consensus'].value).toEqual('pass-thru');
          });

          it('passes the scores value along', function () {
            expect(element.find('question-container')[0].attributes['scores'].value).toEqual('scores');
          });

          it('passes the question type value along', function () {
            expect(element.find('question-container')[0].attributes['question-type'].value).toEqual('assessment');
          });
        });

        describe('when container is clicked', function () {
          it('adds the fa-chevron-down class', function () {
            element.find('.category-label').triggerHandler('click');
            expect(element.find('.category-label').find('i').hasClass('fa-chevron-down')).toBe(true);
          });
        });
      });

      describe('with the question type set to analysis', function () {
        var template = '<category-container categories="categories" question-type="analysis" is-consensus="pass-thru" scores="scores"></category-container>';
        var categories = [{
          name: 'Foo'
        }];

        beforeEach(function () {
          rootScope.categories = categories;
          element = compile(template)(rootScope);
          rootScope.$digest();
        });

        it('contains a question container entry', function () {
          expect(element.find('question-container').length).toEqual(1);
        });

        it('does not display the category label', function () {
          expect(element.find('.category-label').length).toEqual(0);
        });

        describe('when passing values to the question container directive', function () {
          it('passes the category along', function () {
            expect(element.find('question-container')[0].attributes['category'].value).toEqual('category')
          });

          it('passes the is-consensus value along', function () {
            expect(element.find('question-container')[0].attributes['is-consensus'].value).toEqual('pass-thru');
          });

          it('passes the scores value along', function () {
            expect(element.find('question-container')[0].attributes['scores'].value).toEqual('scores');
          });

          it('passes the question type value along', function () {
            expect(element.find('question-container')[0].attributes['question-type'].value).toEqual('analysis');
          });
        });
      });
    });
  });
})();
