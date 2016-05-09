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
              content: '<i class="fa fa-bullhorn"></i><span>Facilitator</span><p>Facilitators share responsibility with the district facilitator to contact participants and view their individual responses, facilitate the consensus meeting, and view the final consensus report.</p><i class="fa fa-pencil-square-o"></i><span>Participant</span><p>Participants responds to the individual readiness assessment survey and take part of the consensus meeting. They can view the final consensus report</p>'

            });
          },
          templateUrl: 'client/views/directives/help_info_popover.html'
        }
      })
})();
