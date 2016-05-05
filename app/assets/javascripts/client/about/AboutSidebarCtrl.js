(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AboutSidebarCtrl', AboutSidebarCtrl);

  AboutSidebarCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$element',
    '$location',
    '$timeout'
  ];

  function AboutSidebarCtrl($scope, $rootScope, $element, $location, $timeout) {
    var vm = this;

    var updateLinks = function () {
      // set sharing URL
      vm.shareURL = $location.absUrl();

      // mark active link in sidebar
      var path = $location.path();
      var links = $element.find("a");
      links.removeClass("active");
      _.each($element.find("a"), function (a) {
        if (a.href.match(path)) {
          $(a).addClass("active");
        }
      });
    };

    $timeout(updateLinks);
    $rootScope.$on('$locationChangeSuccess', updateLinks);
  }
})();
