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
        model: '='
      },
      link: entityDetailsLink,
      templateUrl: 'client/common_create/entity_details.html',
      controller: 'EntityDetailsCtrl',
      controllerAs: 'entityDetails'
    }
  }

  function entityDetailsLink(scope, element) {
    scope.datetime = angular.element(element).find('.datetime').datetimepicker({
      pickTime: false
    });

    scope.datetime.on('dp.change', function() {
      angular.element(element).find('#due-date').trigger('change');
    });
  }
})();
