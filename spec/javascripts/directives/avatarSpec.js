(function () {
  'use strict';

  describe('Directive: avatar', function () {
    var scope,
      element,
      compile;

    beforeEach(function () {
      module('PDRClient');
      inject(function (_$rootScope_, _$compile_) {
        scope = _$rootScope_.$new(true);
        compile = _$compile_;
      });
    });

    describe('when specifying a tool placement for the image', function () {
      beforeEach(function () {
        element = angular.element('<avatar toolplacement="bottom"></avatar>');
        compile(element)(scope);
        scope.$digest();
      });

      it('binds the passed-in value', function () {
        expect(element.find('img').attr('data-placement')).toEqual('bottom');
      });
    });

    describe('when specifying an avatar location for the image', function () {
      beforeEach(function () {
        element = angular.element('<avatar avatar="foo-location.jpg"></avatar>');
        compile(element)(scope);
        scope.$digest();
      });

      it('binds the value correctly', function () {
        expect(element.find('img').attr('src')).toEqual('foo-location.jpg');
      });
    });

    describe('when specifying a custom style for the image', function () {
      beforeEach(function () {
        element = angular.element('<avatar style="background-color: #D37832"></avatar>');
        compile(element)(scope);
        scope.$digest();
      });

      it('binds the style correctly', function () {
        expect(element.find('img').attr('style')).toEqual('background-color: #D37832');
      });
    });

    describe('when specifying a width for the image', function () {
      describe('when no units are specified', function () {
        beforeEach(function () {
          element = angular.element('<avatar width="75"></avatar>');
          compile(element)(scope);
          scope.$digest();
        });

        it('creates the width in pixels', function () {
          expect(element.find('img').attr('style').trim()).toEqual('width: 75px;');
        });
      });

      describe('when units are specified', function () {
        beforeEach(function () {
          element = angular.element('<avatar width="1.2em"></avatar>');
          compile(element)(scope);
          scope.$digest();
        });

        it('creates the width in the specified unit', function () {
          expect(element.find('img').attr('style').trim()).toEqual('width: 1.2em;');
        });
      });
    });

    describe('when specifying a class for the image', function () {
      beforeEach(function () {
        element = angular.element('<avatar imgclass="circle"></avatar>');
        compile(element)(scope);
        scope.$digest();
      });

      it('binds the correct CSS class', function () {
        expect(element.find('img').attr('class')).toEqual('circle');
      });
    });

    describe('when specifying a name for the image', function () {
      describe('when not specifying a role', function () {
        beforeEach(function () {
          element = angular.element('<avatar name="John Doe"></avatar>');
          compile(element)(scope);
          scope.$digest();
        });

        it('adds the name into the DOM', function () {
          expect(element.find('img').attr('data-title')).toEqual('<p class="name">John Doe</p><p class="role">undefined</p>');
        });
      });

      describe('when specifying a role', function () {
        beforeEach(function () {
          element = angular.element('<avatar name="John Doe" role="Helmsman"></avatar>');
          compile(element)(scope);
          scope.$digest();
        });


        it('adds the name and role into the DOM', function () {
          expect(element.find('img').attr('data-title')).toEqual('<p class="name">John Doe</p><p class="role">Helmsman</p>');
        });
      });
    });
  });
})();

