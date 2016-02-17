PDRClient.controller('AssessmentReportCtrl', [
  '$scope', 
  '$http',
  '$timeout', 
  '$anchorScroll',
  '$location', 
  '$stateParams',
  'SessionService', 
  'Assessment', 
  'Report',
  'Consensus',
  'AssessmentService',
  function($scope, $http, $timeout, $anchorScroll, $location, $stateParams, SessionService, Assessment, Report, Consensus, AssessmentService) {

      $scope.currentUser = SessionService.getCurrentUser();
      $scope.id = $stateParams.id;
      $scope.assessment = Assessment.get({id: $scope.id});
      $scope.$watch('assessment', function(){
        if(!$scope.assessment) {
          $scope.shareReportUrl = '';
          return;
        }
        $scope.shareReportUrl = AssessmentService.sharedUrl($scope.assessment.share_token)
      });

      $scope.report = Report.get({assessment_id: $scope.id});

      $scope.isFacilitator = function() {
        return $scope.assessment.owner;
      };

      $scope.canEditPriorities = function() {
        return $scope.isFacilitator();
      };

    }
]);
