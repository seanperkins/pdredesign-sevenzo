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

    vm.save = InviteService.saveAssessment;
    vm.assignAndSave = InviteService.assignAndSaveAssessment;
    vm.saving = false;

    $scope.$on('toggle-saving-state', function() {
      vm.saving = !vm.saving;
    });

    vm.formattedDate = function(date) {
      return moment(date).format('ll');
    };

    InviteService.loadDistrict(vm.district);
    InviteService.loadScope($scope);

    $scope.$watch('district', function(val) {
      vm.district = val;
    }).bind(vm);
  }
})();
