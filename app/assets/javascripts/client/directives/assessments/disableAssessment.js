PDRClient.directive('disableAssessment', function() {
  return {
    restrict: 'C',
    link: function(scope, element, attrs) {
      if (!scope.assessment.has_access)
        element.css('opacity', '0.5');
    }
  };
});
