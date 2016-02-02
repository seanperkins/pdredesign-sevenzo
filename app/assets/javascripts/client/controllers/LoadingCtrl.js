PDRClient.controller('LoadingCtrl', ['$scope', 'SessionService',
    function($scope, SessionService) {

      $scope.format;
      $scope.DOMChanges = function(){
        $('.popover').popover('hide');
        $('.loading-state')
          .height($(document).height());
      };

      $scope.$on('start_change', function() {
        $scope.DOMChanges();
        $scope.loading = true;
      });

      $scope.$on('success_change', function() {
        $scope.loading = false;
      });

      $scope.$on('building_export_file', function(event, args){
        $scope.DOMChanges();
        $scope.format = args.format;
        $scope.loadingPdfCsv = true;
      });

      $scope.$on('stop_building_export_file', function(){
        $scope.loadingPdfCsv = false;
      });
    }
]);
