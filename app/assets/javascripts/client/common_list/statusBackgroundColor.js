(function() {
  'use strict';
  angular.module('PDRClient')
      .directive('statusBackgroundColor', statusBackgroundColor);

  function statusBackgroundColor() {
    return {
      restrict: 'C',
      link: function(scope, element) {

        var backgroundColor = function(entity) {
          if (entity.status === 'draft') {
            element.css('background-color', '#97A0A5');
          } else if (entity.status === 'assessment') {
            element.css('background-color', '#5BC1B4');
          } else {
            element.css('background-color', '#0D4865');
          }
        };

        backgroundColor(scope.entity);
      }
    };
  }
})();
