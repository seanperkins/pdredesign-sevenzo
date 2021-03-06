(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('AboutSidebarCtrl', AboutSidebarCtrl);

  AboutSidebarCtrl.$inject = [
    '$rootScope',
    '$element',
    '$location',
    '$timeout',
    '$modal',
    'SessionService'
  ];

  function AboutSidebarCtrl($rootScope, $element, $location, $timeout, $modal, SessionService) {
    var vm = this;

    vm.isLoggedIn = SessionService.getUserAuthenticated();

    vm.openAssessmentModal = function() {
      $modal.open({
        templateUrl: 'client/home/assessment_modal.html',
        controller: 'AssessmentModalCtrl',
        controllerAs: 'assessmentModal'
      });
    };

    vm.openInventoryModal = function() {
      $modal.open({
        templateUrl: 'client/home/inventory_modal.html',
        controller: 'InventoryModalCtrl',
        controllerAs: 'inventoryModal'
      });
    };

    vm.openAnalysisModal = function() {
      $modal.open({
        templateUrl: 'client/analyses/analysis_modal.html',
        controller: 'AnalysisModalCtrl',
        controllerAs: 'analysisModal',
        resolve: {
          preSelectedInventory: function() {
            return null;
          }
        }
      });
    };

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
