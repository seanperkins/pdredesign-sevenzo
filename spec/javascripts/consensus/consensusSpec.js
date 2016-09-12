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
        describe('on initial page load', function () {
          var $timeout,
            $q,
            $scope,
            ConsensusService,
            viewModel;

          beforeEach(inject(function (_$timeout_, _ConsensusService_, _$q_) {
            $timeout = _$timeout_;
            ConsensusService = _ConsensusService_;
            $scope = element.isolateScope();
            $q = _$q_;

            viewModel = element.isolateScope().vm;
          }));

          it('updates the consensus', function () {
            spyOn(viewModel, 'updateConsensus');
            $timeout.flush();
            expect(viewModel.updateConsensus).toHaveBeenCalled();
          });

          it('broadcasts the correct event', function () {
            viewModel.consensus = {id: 1};
            spyOn(ConsensusService, 'loadConsensus').and.returnValue($q.when({categories: ['foo', 'bar']}));
            spyOn($scope, '$broadcast');

            rootScope.$digest();
            $timeout.flush();

            expect($scope.$broadcast).toHaveBeenCalledWith('receiveCategoryData', ['foo', 'bar']);
          });
        });


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

          describe('select ordering', function () {
            it('displays the first element as "All"', function () {
              expect(element.find('option')[0].text).toEqual('All');
            });

            it('gives no value for the first element', function () {
              expect(element.find('option')[0].text).toEqual('All');
            });

            it('displays the second element as "foo"', function () {
              expect(element.find('option')[1].text).toEqual('foo');
            });

            it('gives the second element value as "foo"', function () {
              expect(element.find('option')[1].value).toEqual('foo');
            });

            it('displays the third element as "bar"', function () {
              expect(element.find('option')[2].text).toEqual('bar');
            });

            it('gives the third element value as "bar"', function () {
              expect(element.find('option')[2].value).toEqual('bar');
            });

            it('displays the fourth element as "baz"', function () {
              expect(element.find('option')[3].text).toEqual('baz');
            });

            it('gives the fourth element value as "baz"', function () {
              expect(element.find('option')[3].value).toEqual('baz');
            });

            it('displays the fifth element as "bing"', function () {
              expect(element.find('option')[4].text).toEqual('bing');
            });

            it('gives the fifth element value as "bing"', function () {
              expect(element.find('option')[4].value).toEqual('bing');
            });

            it('displays the sixth element as "boof"', function () {
              expect(element.find('option')[5].text).toEqual('boof');
            });

            it('gives the sixth element value as "boof"', function () {
              expect(element.find('option')[5].value).toEqual('boof');
            });
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

        it('passes the categories value to the category container directive', function () {
          expect(element.find('category-container')[0].attributes['categories'].value).toEqual('vm.categories');
        });

        it('passes the question type value to the category container directive', function () {
          expect(element.find('category-container')[0].attributes['question-type'].value).toEqual('assessment');
        });

        it('passes the scores value to the category container directive', function () {
          expect(element.find('category-container')[0].attributes['scores'].value).toEqual('vm.scores');
        });

        it('passes the consensus value to the category container directive', function () {
          expect(element.find('category-container')[0].attributes['is-consensus'].value).toEqual('true');
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

        it('passes the consensus value to the variance category container directive', function () {
          expect(element.find('variance-category-container')[0].attributes['is-consensus'].value).toEqual('true');
        });

        it('passes the variance questions value to the variance category container directive', function () {
          expect(element.find('variance-category-container')[0].attributes['variance-questions'].value).toEqual('vm.varianceOrderedQuestions');
        });

        it('passes the scores value to the variance category container directive', function () {
          expect(element.find('variance-category-container')[0].attributes['scores'].value).toEqual('vm.scores');
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


        it('passes the categories value to the category container directive', function () {
          expect(element.find('category-container')[0].attributes['categories'].value).toEqual('vm.categories');
        });

        it('passes the question type value to the category container directive', function () {
          expect(element.find('category-container')[0].attributes['question-type'].value).toEqual('analysis');
        });

        it('passes the scores value to the category container directive', function () {
          expect(element.find('category-container')[0].attributes['scores'].value).toEqual('vm.scores');
        });

        it('passes the consensus value to the category container directive', function () {
          expect(element.find('category-container')[0].attributes['is-consensus'].value).toEqual('true');
        });


        it('does not include the varianceCategoryContainer directive', function () {
          expect(element.find('variance-category-container').length).toEqual(0);
        });
      });
    });
  });
})();
