(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('responseAnswerForm', responseAnswerForm);

  function responseAnswerForm() {
    return {
      restrict: 'E',
      transclude: true,
      scope: {
        question: '=',
        answer: '='
      },
      replace: true,
      templateUrl: 'client/views/directives/responses/form.html',
      controller: 'ResponseAnswerFormCtrl',
      controllerAs: 'responseAnswerForm'
    }
  }
})();