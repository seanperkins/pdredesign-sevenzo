(function() {
  'use strict';
  angular.module('PDRClient').controller('InventoryReportDownloadCtrl', InventoryReportDownloadCtrl);

  InventoryReportDownloadCtrl.$inject = ['$scope', 'UrlService'];

  function InventoryReportDownloadCtrl($scope, UrlService) {
    var vm = this;
    vm.inventory = $scope.inventory;
    vm.download = function () {
      var buildLink = function (prefix) {
        var link = angular.element('<a/>');
        link.attr({
          href: UrlService.url('/inventories'/ + vm.inventory.id + '/' + prefix + '.csv'),
          target: '_blank',
          download: 'inventory_' + vm.inventory.id + '_' + prefix + '_report.csv'
        })[0].click();
      }
      if (vm.downloadOptions.productEntries) {
        buildLink('product_entries');
      }
      if (vm.downloadOptions.dataEntries) {
        buildLink('data_entries');
      }
      $scope.$emit('inventory-report-downloaded');
    }
  }
})();
