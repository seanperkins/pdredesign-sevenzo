(function () {
  'use strict';

  describe('Directive: varianceCategoryContainer', function () {
    var element,
      rootScope,
      compile;

    beforeEach(function () {
      module('templates');
      module('PDRClient', function ($provide) {
        $provide.factory('responseAnswerGroupDirective', function () {
          return {};
        });
      });

      inject(function (_$rootScope_, _$compile_) {
        rootScope = _$rootScope_;
        compile = _$compile_;
      });
    });

    describe('when no variance questions exist', function () {
      var template = '<variance-category-container></variance-category-container>';

      beforeEach(function () {
        element = compile(template)(rootScope);
        rootScope.$digest();
      });

      it('contains no children', function () {
        expect(element.children().length).toEqual(0);
      });
    });

    describe('when variance questions exist', function () {
      var varianceQuestions,
        template = '<variance-category-container variance-questions="varianceQuestions"></variance-category-container>';

      describe('at all times', function () {
        beforeEach(function () {
          varianceQuestions = [{
            id: 1,
            number: 1,
            headline: 'Foo headline',
            content: 'Bar content'
          }];

          rootScope.varianceQuestions = varianceQuestions;
          element = compile(template)(rootScope);
          rootScope.$digest();
        });

        it('contains a question row', function () {
          expect(element.find('.question-row').length).toEqual(1);
        });

        it('has a class associated with the question ID', function () {
          expect(element.find('.question-1').length).toEqual(1);
        });

        it('binds the headline appropriately', function () {
          expect(element.find('.question-headline').text()).toEqual('Foo headline');
        });

        it('binds the content appropriately', function () {
          expect(element.find('.content').text()).toEqual('Bar content');
        });

        it('passes the question property to the responseAnswerGroup directive', function () {
          expect(element.find('response-answer-group')[0].attributes['question'].value).toEqual('question');
        });

        it('always passes the isConsensus property as true to the responseAnswerGroup directive', function () {
          expect(element.find('response-answer-group')[0].attributes['is-consensus'].value).toEqual('true');
        });

        it('passes the scores property to the responseAnswerGroup directive', function () {
          expect(element.find('response-answer-group')[0].attributes['scores'].value).toEqual('scores');
        });

        it('always passes the showSkip property as false to the responseAnswerGroup directive', function () {
          expect(element.find('response-answer-group')[0].attributes['show-skip'].value).toEqual('false');
        });

        describe('when clicking a child element of the question row', function () {
          var scope,
            ResponseHelper;
          beforeEach(function () {
            inject(function (_ResponseHelper_) {
              ResponseHelper = _ResponseHelper_;
            });

            scope = element.isolateScope();

            spyOn(ResponseHelper, 'toggleAnswers');
            spyOn(scope, '$broadcast');

            element.find('.question-content').trigger('click');
          });

          it('broadcasts the question-toggled event', function () {
            expect(scope.$broadcast).toHaveBeenCalledWith('question-toggled', 1);
          });

          it('sends the question along to ResponseHelper', function () {
            var questionSent = ResponseHelper.toggleAnswers.calls.argsFor(0)[0];
            expect(questionSent.id).toEqual(1);
            expect(questionSent.number).toEqual(1);
            expect(questionSent.headline).toEqual('Foo headline');
            expect(questionSent.content).toEqual('Bar content');
          });

          it('sends the event target along to ResponseHelper', function () {
            var target = ResponseHelper.toggleAnswers.calls.argsFor(0)[1].target;
            expect(target.classList.contains('question-content')).toBe(true);
          });
        });
      });

      describe('when the question is loading', function () {
        beforeEach(function () {
          varianceQuestions = [{
            id: 1,
            number: 1,
            headline: 'Foo headline',
            content: 'Bar content',
            loading: true,
            score: {
              value: 3
            }
          }];

          rootScope.varianceQuestions = varianceQuestions;
          element = compile(template)(rootScope);
          rootScope.$digest();
        });

        it('displays the spinner', function () {
          expect(element.find('.fa-spinner').length).toEqual(1);
        });

        it('binds the correct class to the paragraph', function () {
          expect(element.find('.scored-3').length).toEqual(1);
        });
      });

      describe('when the question is not loading', function () {
        beforeEach(function () {
          varianceQuestions = [{
            id: 1,
            number: 2,
            headline: 'Foo headline',
            content: 'Bar content',
            loading: false
          }];

          rootScope.varianceQuestions = varianceQuestions;
          element = compile(template)(rootScope);
          rootScope.$digest();
        });

        it('does not display the spinner', function () {
          expect(element.find('.fa-spinner').length).toEqual(0);
        });

        it('binds the correct id to the paragraph', function () {
          expect(element.find('#question-2').length).toEqual(1);
        });

        it('binds the correct value to the paragraph', function () {
          expect(element.find('#question-2').text().trim()).toEqual('2');
        });

        it('binds the correct href', function () {
          expect(element.find('a').attr('href')).toEqual('#question-1');
        });
      });
    });
  });
})();