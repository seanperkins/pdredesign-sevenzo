(function() {
  'use strict';
  angular.module('PDRClient')
      .controller('InventoryProductEntriesCtrl', InventoryProductEntriesCtrl);

  InventoryProductEntriesCtrl.$inject = [
    '$scope',
    '$q',
    '$compile',
    '$modal',
    'ProductEntry',
    'DTOptionsBuilder',
    'DTColumnBuilder'
  ];

  function InventoryProductEntriesCtrl($scope, $q, $compile, $modal, ProductEntry, DTOptionsBuilder, DTColumnBuilder) {
    var vm = this;
    vm.inventory = $scope.inventory;
    vm.readOnly = $scope.readOnly;
    vm.shared = $scope.shared;
    var inventoryId = vm.shared ? vm.inventory.share_token : vm.inventory.id;

    var options = DTOptionsBuilder.fromFnPromise(function() {
      var deferred = $q.defer();
      ProductEntry.get({inventory_id: inventoryId}).$promise.then(function(results) {
        vm.productEntries = results.product_entries;
        deferred.resolve(results.product_entries);
      }, deferred.reject);
      return deferred.promise;
    });

    //HACK: activate datatables.buttons plugin, we'll be able to get rid of this once we migrate to angular-datatables 0.3.x
    options.withButtons = function(buttonsOptions) {
      var options = this;
      var buttonsPrefix = 'B';
      options.dom = options.dom ? options.dom : $.fn.dataTable.defaults.sDom;
      if (options.dom.indexOf(buttonsPrefix) === -1) {
        options.dom = buttonsPrefix + options.dom;
      }
      options.buttons = buttonsOptions;
      return options;
    };

    vm.dtOptions = options.withPaginationType('full_numbers').withButtons([
      {
        extend: 'columnsToggle',
        columns: '1:visible, 2:visible, 3:visible, 4:visible, 5:visible, 6:visible'
      }
    ]);
    vm.dtColumns = [
      DTColumnBuilder.newColumn(null)
        .notSortable()
        .renderWith(actionsHTML)
        .withOption('createdCell', function (cell) {
          $compile(angular.element(cell).contents())($scope);
        }),
      DTColumnBuilder.newColumn('general_inventory_question.product_name').withTitle('Name'),
      DTColumnBuilder.newColumn('general_inventory_question.vendor').withTitle('Vendor'),
      DTColumnBuilder.newColumn('general_inventory_question.purpose').withTitle('Used For'),
      DTColumnBuilder.newColumn('technical_question.hosting').withTitle('Hosted'),
      DTColumnBuilder.newColumn('technical_question.connectivity').withTitle('Connected'),
      DTColumnBuilder.newColumn('technical_question.single_sign_on').withTitle('Single Sign-On'),
      DTColumnBuilder.newColumn('usage_question.usage').withTitle('Usage Data')
    ];

    vm.showProductEntryModal = function(productEntryId) {
      $scope.resource = _.find(vm.productEntries, {id: productEntryId});

      vm.modalInstance = $modal.open({
        template: '<product-entry-modal inventory="inventory" resource="resource"></product-entry-modal>',
        scope: $scope
      });
    };

    vm.deleteProductEntry = function (productEntryId) {
      ProductEntry
        .delete({
          inventory_id: vm.inventory.id,
          product_entry_id: productEntryId
        })
        .$promise
        .then(function () {
          vm.dtOptions.reloadData(null, true);
        });
    };

    vm.restoreProductEntry = function (productEntryId) {
      ProductEntry
        .restore({
          inventory_id: vm.inventory.id,
          product_entry_id: productEntryId
        }, {})
        .$promise
        .then(function () {
          vm.dtOptions.reloadData(null, true);
        });
    };

    $scope.$on('close-product-entry-modal', function() {
      vm.modalInstance && vm.modalInstance.dismiss('cancel');
      vm.dtOptions.reloadData(null, true);
    });

    function actionsHTML (data) {
      var editHTML = '<i class="fa fa-pencil" ng-click="inventoryProductEntries.showProductEntryModal(' + data.id + ')"></i>';
      var deleteHTML = '<i class="fa fa-remove" ng-click="inventoryProductEntries.deleteProductEntry(' + data.id + ')"></i>';
      var restoreHTML = '<i class="fa fa-undo" ng-click="inventoryProductEntries.restoreProductEntry(' + data.id + ')"></i>';

      // TODO this should be "if user is an owner or facilitator"
      if (true) {
        return editHTML + deleteHTML + restoreHTML;
      } else {
        return editHTML + deleteHTML;
      }
    }
  }
})();
