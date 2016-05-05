(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('assessmentModal', assessmentModal);

  function assessmentModal() {
    return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
        modalTitle: '&',
        user: '='
      },
      templateUrl: 'client/home/assessment_modal.html',
      controller: 'AssessmentModalCtrl',
      controllerAs: 'assessmentModal',
      link: assessmentModalLink
    }
  }

  function assessmentModalLink(element, attributes, scope, controller) {
    controller.datetime = $('.datetime').datetimepicker({
      pickTime: false
    });

    controller.datetime.on('dp.change', function() {
      $('#due-date').trigger('change');
    });
  }
})();