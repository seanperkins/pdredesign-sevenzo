(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AddNewParticipantsCtrl', AddNewParticipantsCtrl);

  function AddNewParticipantsCtrl() {
    var vm = this;


    vm.shouldSendInvite = function() {
      return $scope.sendInvite === "true" || $scope.sendInvite === true;
    };

    vm.addParticipant = function(user) {
      Participant
          .save({assessment_id: $scope.assessmentId}, {user_id: user.id, send_invite: vm.shouldSendInvite()})
          .$promise
          .then(function() {
            $scope.updateData();
            $scope.$emit('update_participants');
          });
    };
  }
})();