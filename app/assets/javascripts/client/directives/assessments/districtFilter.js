PDRClient.directive('districtFilter', [
  function() {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: 'client/views/assessments/filters/district-filter.html',
      scope: {
        districts: '=',
        selectedDistrict: '=',
      },
    };
}]);
