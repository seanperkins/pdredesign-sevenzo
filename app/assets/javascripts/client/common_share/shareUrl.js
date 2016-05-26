(function() {
  'use strict';

  angular.module('PDRClient')
      .directive('shareUrl', shareUrl);

  function shareUrl() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        url: '@'
      },
      controller: 'ShareUrlCtrl',
      controllerAs: 'shareUrl',
      templateUrl: 'client/common_share/share_url.html'
    }
  }
})();

