PDRClient.directive('responseStatus', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        user: "=",
      },
      templateUrl: 'client/views/directives/response_status.html',
      controller: [
        '$scope',
        '$timeout',
        '$http',
        'UrlService',
        function($scope, $timeout, $http, UrlService) {
          $scope.endpoint = function(){
            return UrlService.url('assessments/' +
              $scope.user.assessment_id +
              '/participants/' +
              $scope.user.participant_id +
              '/mail');
          };

          $scope.sendEmail = function() {
            $scope.getEmailBody().then(function(response){
              var body = escape(response.data);
              var link = "mailto:" + $scope.user.email + "?subject=Invitation&body=" + body;
              $scope.triggerMailTo(link);
            });
          };

          $scope.triggerMailTo = function(link) {
            window.top.location = link;
          };

          $scope.showMailLink = function() {
            return $scope.user.status == 'invited';
          };

          $scope.getEmailBody = function() {
            return $http({method: "GET", url: $scope.endpoint()})
              .success(function(response){
                return response;
              }
            );
          };

          $scope.statusMessageIcon = function(status) {
            switch(status) {
              case 'invited':
                return 'fa-envelope-o';
              case 'completed':
                return 'fa-check';
              case 'in_progress':
                return 'fa-spinner';
              default:
                return 'fa-envelope-o';
            }
          };
        }]
    };
}]);
