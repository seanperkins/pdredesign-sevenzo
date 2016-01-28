PDRClient.directive('assessmentBackgroundColor', function() {
  return {
    restrict: 'C',
    link: function(scope, element, attrs, controller) {

      var backgroundColor = function(assessment) {

        if(assessment.status == "draft")
          return  element.css('background-color', '#97A0A5');
        else if(assessment.status == "assessment")
          return element.css('background-color', '#5BC1B4');

        return element.css('background-color', '#0D4865');
      };

      backgroundColor(scope.assessment);
    }
  };
});