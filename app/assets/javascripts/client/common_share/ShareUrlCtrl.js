(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('ShareUrlCtrl', ShareUrlCtrl);

  ShareUrlCtrl.$inject = [
    '$scope'
  ];

  function ShareUrlCtrl($scope) {
    var vm = this;

    vm.clipboard = new Clipboard('[data-clipboard-target]');

    vm.clipboard.on('success', function () {
      vm.copied = true;
      $scope.$digest();
    });

    $scope.$watch('url', function (url) {
      vm.url = url;
    });
  }
})();

