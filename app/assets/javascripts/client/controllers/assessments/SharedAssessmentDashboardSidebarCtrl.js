PDRClient.controller('SharedAssessmentDashboardSidebarCtrl', [
  '$scope',
  '$location',
  'SharedAssessment',
  function($scope, $location, SharedAssessment, $stateParams) {
      var token = $location.search().token || "";
      $scope.token = token;
      $scope.fetchAssessment = function() {
        return SharedAssessment.get({token: $scope.token});
      };

      $scope.assessment = $scope.fetchAssessment();

      $scope.meetingDateDaysAgo = function() {
        return moment().diff($scope.assessment.meeting_date, 'days');
      };

      $scope.postMeetingDate = function() {
        if(!$scope.assessment.meeting_date)
          return false;
        return moment().isAfter($scope.assessment.meeting_date);
      };
    }
]);
