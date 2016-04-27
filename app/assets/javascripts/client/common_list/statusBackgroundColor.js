(function() {
  'use strict';
  angular.module('PDRClient')
      .directive('statusBackgroundColor', statusBackgroundColor);

  function statusBackgroundColor() {
    return {
      restrict: 'C',
      link: statusBackgroundColorLink
    };
  }

  function statusBackgroundColorLink(scope, element) {
    var backgroundColor = function(entity) {
      if (entity.status === 'draft') {
        element.addClass('draft-state');
      } else if (entity.status === 'assessment') {
        element.addClass('assessment-state');
      } else if(entity.status === 'inventory') {
        if(entity.consensus && entity.consensus.is_completed) {
          element.addClass('completed-inventory-state');
        } else {
          element.addClass('inventory-state');
        }
      } else {
        element.addClass('consensus-state');
      }
    };

    backgroundColor(scope.entity);
  }
})();
