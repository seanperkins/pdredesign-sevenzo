PDRClient.directive("sampleEvidence", ['$timeout', function ($timeout) {
  return {
      restrict: 'E',
      scope: {
          keyQuestion: "="
      },
      templateUrl: 'client/views/directives/sample_evidence.html',
      link: function (scope, element, attrs) {
        attrs.$observe('keyQuestion', function() {
          if(!scope.keyQuestion) return;

          var content = "<b>" +  scope.keyQuestion.text + "</b>";

          content += "<ul>";
          angular.forEach(scope.keyQuestion.points, function(point, key) {
            content += "<li>" + point.text + "</li>";
          });
          content += "</ul>";

          scope.content = content;
        });

        $timeout(function(){
          $("[data-toggle=sampleEvidence]").popover({
            html : true,
            placement: 'top',
            trigger: 'hover',
          });
        });
      }
  };
}]);
