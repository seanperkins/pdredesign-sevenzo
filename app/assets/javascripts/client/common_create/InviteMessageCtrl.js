(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InviteMessageCtrl', InviteMessageCtrl);

  InviteMessageCtrl.$inject = [
    '$scope',
    'SessionService',
    'InviteService'
  ];

  function InviteMessageCtrl($scope, SessionService, InviteService) {
    var vm = this;

    vm.user = SessionService.getCurrentUser();
    vm.saving = false;

    vm.save = function(assessment, assign) {
      InviteService.saveAssessment(assessment, assign);
    };

    vm.assignAndSave = function(assessment) {
      InviteService.assignAndSaveAssessment(assessment);
    };

    vm.formattedDate = function(date) {
      return moment(date).format('ll');
    };

    InviteService.loadScope($scope);

    $scope.$on('toggle-saving-state', function() {
      vm.saving = !vm.saving;
    });

    $scope.$watch('district', function(val) {
      InviteService.loadDistrict(val);
    });
  }
})();
