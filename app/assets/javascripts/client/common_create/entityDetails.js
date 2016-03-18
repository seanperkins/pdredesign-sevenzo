(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('entityDetails', entityDetails);

  function entityDetails() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        entity: '='
      },
      templateUrl: 'client/common_create/entity_details.html',
      controller: 'EntityDetailsCtrl',
      controllerAs: 'entityDetails'
    }
  }
})();
