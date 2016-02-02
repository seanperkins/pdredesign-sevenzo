PDRClient.controller('ModifyScheduleCtrl', [
  '$scope',
  '$timeout',
  'Assessment',
    function($scope, $timeout, Assessment) {
      $timeout(function() {
        if($scope.assessment.due_date != null)
          $scope.modal_due_date = moment($scope.assessment.due_date).format("MM/DD/YYYY");

        if($scope.assessment.meeting_date != null)
          $scope.modal_meeting_date = moment($scope.assessment.meeting_date).format("MM/DD/YYYY");

        $('.datetime').datetimepicker({pickTime: false});

      });

      $scope.updateAssessment = function() {
        $scope.assessment.due_date     = moment($('#due-date').val()).toISOString();
        $scope.assessment.meeting_date = moment($('#meeting-date').val()).toISOString();

        Assessment
          .save({id: $scope.assessment.id}, $scope.assessment)
          .$promise
          .then(function(){
            $scope.$close(true); 
          });
      };

    }
]);
