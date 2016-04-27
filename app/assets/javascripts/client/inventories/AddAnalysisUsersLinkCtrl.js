(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('AddAnalysisUsersLinkCtrl', AddAnalysisUsersLinkCtrl);

  AddAnalysisUsersLinkCtrl.$inject = [
    '$modal',
    '$scope',
    '$stateParams',
    'AnalysisParticipant'
  ];

  function AddAnalysisUsersLinkCtrl($modal, $scope, $stateParams, AnalysisParticipant) {
    var vm = this;
    vm.open = function() {
      vm.modal = $modal.open({
        templateUrl: 'client/inventories/add_analysis_users_modal.html',
        scope: $scope,
        windowClass: 'request-access-window',
        size: 'lg'
      });
    };

    vm.close = function() {
      vm.modal.dismiss();
    };

    vm.loadInvitables = function() {
      vm.invitables = AnalysisParticipant.all({inventory_id: $stateParams.inventory_id});
    };
    vm.invitablesFound = function() {
      var list = vm.invitables;
      return list && list.length > 0;
    };
    vm.loadInvitables();

    $scope.$on('close-add-participants', function() {
      vm.close();
    });
  }
})();
