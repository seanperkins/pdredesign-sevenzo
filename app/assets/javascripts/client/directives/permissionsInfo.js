(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('permissionsInfo', function() {
        return {
          restrict: 'E',
          transclude: true,
          replace: true,
          scope: {
            placement: '@'
          },
          link: function(scope) {
            $("[data-toggle=requestPopover]").popover({
              html: true,
              placement: scope.placement,
              trigger: 'hover',
              content: '<i class="fa fa-bullhorn"></i><span>Facilitator</span><p>Facilitators share responsibility with the district facilitator to contact participants and view their responses, facilitate any in-person meetings, and can share and view the final reports.</p><i class="fa fa-pencil-square-o"></i><span>Participant</span><p>Participants share their insights in surveys and inventories and also take part in in-person meetings. They can view and share the final reports.</p>'

            });
          },
          templateUrl: 'client/views/directives/help_info_popover.html'
        }
      })
})();
