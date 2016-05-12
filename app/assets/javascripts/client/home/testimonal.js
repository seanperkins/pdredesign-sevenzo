(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('testimonial', testimonial);

  function testimonial() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        image: '@',
        backgroundStyle: '@',
        learnMoreLink: '@',
        quote: '@',
        author: '@',
        subtext: '@',
        toolName: '@',
        alternate: '@'
      },
      templateUrl: 'client/home/testimonial_template.html'
    }
  }
})();