(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('ShareUrlCtrl', ShareUrlCtrl);

  ShareUrlCtrl.$inject = [
    '$scope'
  ];

  function ShareUrlCtrl($scope) {
    var vm = this;

    $scope.$watch('url', function (url) {
      vm.url = url;
    });

    new Clipboard('[data-clipboard-target]');
  }
})();

