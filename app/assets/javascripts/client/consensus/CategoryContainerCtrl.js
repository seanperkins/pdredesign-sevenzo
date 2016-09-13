(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('CategoryContainerCtrl', CategoryContainerCtrl);

  CategoryContainerCtrl.$inject = [
    '$scope',
    'ResponseHelper'
  ];

  function CategoryContainerCtrl($scope, ResponseHelper) {
    var vm = this;

    vm.toggleCategoryAnswers = function (category) {
      category.toggled = !category.toggled;
      angular.forEach(category.questions, function (question) {
        ResponseHelper.toggleCategoryAnswers(question);
        $scope.$broadcast('question-toggled', question.id);
      });
    };
  }
})();