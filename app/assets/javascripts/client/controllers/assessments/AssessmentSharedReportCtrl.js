PDRClient.controller('AssessmentSharedReportCtrl', [
  '$scope', 
  '$http',
  '$timeout', 
  '$anchorScroll',
  '$location', 
  '$stateParams',
  'SharedAssessment', 
  'SharedReport',
  'Consensus',
  function($scope, $http, $timeout, $anchorScroll, $location, $stateParams, SharedAssessment, SharedReport, Consensus) {
      var token = $location.search().token || "";
      $scope.token = token;
      $scope.assessment = SharedAssessment.get({token: token});
      $scope.report = SharedReport.get({token: token});

      $scope.isFacilitator = function() {
        return false;
      };

      $scope.canEditPriorities = function() {
        return false;
      };
    }
]);
