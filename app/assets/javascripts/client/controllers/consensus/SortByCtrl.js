(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('SortByCtrl', SortByCtrl);

  SortByCtrl.$inject = [
    '$scope'
  ];

  function SortByCtrl($scope) {
    var vm = this;

    vm.changeViewMode = function(viewMode) {
      switch(viewMode.toLowerCase()) {
        case 'variance':
          $scope.$parent.vm.displayMode = 'variance';
          $scope.$parent.vm.varianceOrderedQuestions = vm.sortByVariance(vm.data);
          break;
        case 'category':
          $scope.$parent.vm.displayMode = 'category';
          $scope.$parent.vm.categories = vm.sortByCategory();
          break;
      }
    };

    vm.sortByCategory = function() {
      return vm.data;
    };

    vm.sortByVariance = function(categories) {
      var questions = [];

      angular.forEach(categories, function(category) {
        angular.forEach(category.questions, function(question) {
          questions.push(question);
        });
      });

      questions.sort(function(a, b) {
        return b.variance - a.variance;
      });

      return questions;
    };

    $scope.$watch('$parent.vm.data', function(val) {
      vm.data = val;
    }).bind(vm);

    $scope.$watch('$parent.vm.categories', function(val) {
      vm.categories = val;
    }).bind(vm);
  }
})();