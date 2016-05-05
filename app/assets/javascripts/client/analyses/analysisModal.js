(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('analysisModal', analysisModal);

  function analysisModal() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        inventory:'='
      },
      templateUrl: 'client/analyses/analysis_modal.html',
      controller: 'AnalysisModalCtrl',
      controllerAs: 'analysisModal',
      link: analysisModalLink
    }
  }

  function analysisModalLink (scope, element, attributes, controller) {
    var $datetime = element.find('.datetime');
    var $datetimePicker = $datetime.datetimepicker({pickTime: false});
    $datetimePicker.on('dp.change', function () {
      $datetime.find('input').trigger('change');
    });

    controller.updateData();
  }
})();
