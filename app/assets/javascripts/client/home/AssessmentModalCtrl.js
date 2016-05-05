(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AssessmentModalCtrl', AssessmentModalCtrl);

  AssessmentModalCtrl.$inject = [
    '$scope',
    'SessionService',
  ];

  function AssessmentModalCtrl($scope, SessionService) {
    var vm = this;
    
    vm.modalTitle = $scope.modalTitle;
    vm.alerts = [];
  }
})();