PDRClient.directive('manageParticipants', ['SessionService', 'Assessment', '$timeout', '$modal',
    function(SessionService, Assessment, $timeout, $modal) {
      return {
        restrict: 'E',
        replace: false,
        templateUrl: 'client/views/directives/manage_participants.html',
        scope: {
          'assessmentId': '@',
          'sendInvite': '@',
          'numberOfRequests': '@',
          'autoShow': '@'
        },
        controller: ['$scope', '$timeout', '$modal', 'Participant', 'AssessmentPermission', function($scope, $timeout, $modal, Participant, AssessmentPermission) {

          $scope.participants = [];
          $scope.access_requests = [];
          $scope.assessment_users = [];


          $timeout(function() {
            if($scope.autoShow == "true" || $scope.autoShow == true) {
              $scope.showAddParticipants();
            }

          } , 0);

          $scope.showAddParticipants = function() {
            $scope.updateData();

            $scope.modalInstance = $modal.open({
              windowClass: 'permissions-modal',
              templateUrl: 'client/views/modals/manage_participants.html',
              scope: $scope,
              size: 'lg'
            });
          };

          $scope.humanPermissionName = function(value) {
            return value === '' ? 'None' : value;
          }

          $scope.performPermissionsAction = function(action, id, email) {
            var params = { assessment_id: $scope.assessmentId, id: id };

            action(params, { email: email })
              .$promise
              .then(function() {
                $scope.updateData();
                $scope.$emit('update_participants');
              });
          }

          $scope.savePermissions = function(){
            var $form = $('#current_user_permissions');
            var permissions = [];

            jQuery.each($form.find('fieldset'), function( i, fieldset ) {
              permissions.push({
                email: $(fieldset).find('input[name=email]').val(),
                level: $(fieldset).find('select').val()
              });
            });

            AssessmentPermission.update({
              id: 1,
              assessment_id: $scope.assessmentId
            }, { permissions: permissions }, function(){
              $scope.updateData();
              $scope.$emit('update_participants');
              $scope.hideModal();
            });
          };

          $scope.hideModal = function() {
            $scope.modalInstance.dismiss('cancel');
          };

          $scope.updateData = function(){
            $scope.updateParticipants();
            $scope.updateAccessRequests();
            $scope.updateAssessmentUsers();
          };

          $scope.updateParticipants = function() {
            $scope.participants = Participant.all({assessment_id: $scope.assessmentId});
          };

          $scope.updateAssessmentUsers = function(){
            $scope.assessment_users = AssessmentPermission.users({assessment_id: $scope.assessmentId});
          };

          $scope.updateAccessRequests = function(){
            $scope.access_requests = AssessmentPermission.query({assessment_id: $scope.assessmentId});
          };

          $scope.shouldSendInvite = function() {
            return $scope.sendInvite === "true" || $scope.sendInvite === true;
          };

          $scope.addParticipant = function(user) {
            Participant
              .save({assessment_id: $scope.assessmentId}, {user_id: user.id, send_invite: $scope.shouldSendInvite()})
              .$promise
              .then(function() {
                $scope.updateData();
                $scope.$emit('update_participants');
              });
          };

          $scope.denyRequest = function(options){
            //id and email are valid
            if (confirm("Are you sure you want to deny this access request?")){
              $scope.performPermissionsAction(
                AssessmentPermission.deny,
                options.id,
                options.email);
            }
          };

          $scope.acceptRequest = function(options){
            //id and email are valid
            if (confirm("Are you sure you want to accept this access request?")){
              $scope.performPermissionsAction(
                AssessmentPermission.accept,
                options.id,
                options.email);
            }
          };

        }],
     };
}]);
