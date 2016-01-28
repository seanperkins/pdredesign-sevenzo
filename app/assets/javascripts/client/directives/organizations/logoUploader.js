PDRClient.directive('logoUploader', [
  function() {
    return {
      restrict: 'E',
      replace: false,
      templateUrl: 'client/views/settings/logo_uploader.html',
      scope: {
        organizationId: '=',
        messages: '='
      },
      controller: [
        '$scope',
        '$timeout',
        'FileUploader',
        'UrlService',
        'Organization',
        function($scope, $timeout, FileUploader, UrlService, Organization) {
          $scope.uploading = false;

          $scope.$watch('organizationId', function(id){
            $scope.updateLogo(id);
          });

          $scope.uploadEndpoint = function() {
            return UrlService.url('organizations/' 
                                + $scope.organizationId 
                                + '/logo');
          };

          $scope.updateLogo = function(id) {
            Organization
              .get({id: id})
              .$promise
              .then(function(org) {
                $scope.logo = org.logo;
              });
          };

          $scope.uploader = new FileUploader({
            url: $scope.uploadEndpoint(),
            autoUpload: true,
            onBeforeUploadItem: function() {
              $scope.uploading = true;
            },
            onCompleteAll: function() {
              $scope.uploading = false;
              $scope.messages = {type: 'success', msg: 'Logo updated'};
              $scope.updateLogo($scope.organizationId);
            }
          });

        }]
    };
}]);
