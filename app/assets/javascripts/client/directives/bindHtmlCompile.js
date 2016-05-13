(function () {
  'use strict';

  angular.module('PDRClient')
      .directive('bindHtmlCompile', bindHtmlCompile);
  
  bindHtmlCompile.$inject = [
    '$compile'
  ];
  
  function bindHtmlCompile($compile) {
    return {
      restrict: 'A',
      link: function (scope, element, attrs) {
        scope.$watch(function () {
          return scope.$eval(attrs.bindHtmlCompile);
        }, function (value) {
          element.html(value);
          $compile(element.contents())(scope);
        });
      }
    };
  };
})();


