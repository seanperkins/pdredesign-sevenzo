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
      var emittedValue;
      switch(viewMode.toLowerCase()) {
        case 'variance':
          emittedValue = vm.sortByVariance(vm.data);
          $scope.$emit('updateVariance', emittedValue);
          break;
        case 'category':
          emittedValue = vm.sortByCategory();
          $scope.$emit('updateCategory', emittedValue);
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
          question.variance = question.variance || 0;
          questions.push(question);
        });
      });

      questions.sort(function(a, b) {
        return b.variance - a.variance;
      });

      return questions;
    };

    $scope.$on('receiveCategoryData', function (event, val) {
      vm.data = val;
    });
  }
})();