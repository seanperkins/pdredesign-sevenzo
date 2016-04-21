(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InviteAnalysisUserCtrl', InviteAnalysisUserCtrl);

  InviteAnalysisUserCtrl.$inject = [
    '$scope',
    '$stateParams',
    'AnalysisInvitation'
  ];

  function InviteAnalysisUserCtrl($scope, $stateParams, AnalysisInvitation) {
    var vm = this;

    vm.sendInvitation = function(invitation) {
      vm.alerts = [];
      vm.addAlert = function(message) {
        vm.alerts.push({type: 'danger', msg: message});
      };

      vm.closeAlert = function(index) {
        vm.alerts.splice(index, 1);
      };

      AnalysisInvitation.create({inventory_id: $stateParams.inventory_id}, invitation)
          .$promise
          .then(function() {
            $scope.$emit('invite-sent');
          })
          .catch(function(response) {
            var errors = response.data.errors;
            angular.forEach(errors, function(error, field) {
              vm.addAlert(field + " : " + error);
            });
          });
    };
  }
})();
