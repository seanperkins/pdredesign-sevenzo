(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('InviteUserCtrl', InviteUserCtrl);

  InviteUserCtrl.$inject = [
    '$scope',
    '$modal',
    '$stateParams',
    'UserInvitation'
  ];

  function InviteUserCtrl($scope, $modal, $stateParams, UserInvitation) {
    $scope.alerts = [];
    $scope.addAlert = function(message) {
      $scope.alerts.push({type: 'danger', msg: message});
    };

    $scope.closeAlert = function(index) {
      $scope.alerts.splice(index, 1);
    };

    $scope.showInviteUserModal = function() {
      $scope.modalInstance = $modal.open({
        templateUrl: 'client/views/modals/invite_user.html',
        scope: $scope
      });
    };

    $scope.shouldSendInvite = function() {
      return $scope.sendInvite === 'true';
    };

    $scope.closeModal = function() {
      $scope.modalInstance.dismiss('cancel');
    };

    $scope.createInvitation = function(userObject) {
      if ($scope.shouldSendInvite()) {
        userObject['send_invite'] = true;
      }

      UserInvitation
          .create({assessment_id: $stateParams.id}, userObject)
          .$promise
          .then(function() {
            $scope.$emit('update_participants');
            $scope.closeModal();
          }, function(response) {
            var errors = response.data.errors;
            angular.forEach(errors, function(error, field) {
              $scope.addAlert(field + " : " + error);
            });

          });
    };
  }
})();