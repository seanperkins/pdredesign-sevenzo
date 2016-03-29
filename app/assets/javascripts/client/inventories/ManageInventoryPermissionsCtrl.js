(function() {
  'use strict';
  angular.module('PDRClient').controller('ManageInventoryPermissionsCtrl', ManageInventoryPermissionsCtrl); 

  ManageInventoryPermissionsCtrl.$inject = ['$modal', '$scope', 'InventoryPermission'];

  function ManageInventoryPermissionsCtrl($modal, $scope, InventoryPermission) {
    var vm = this;
    vm.loadList = function() {
      vm.list = InventoryPermission.list({inventory_id: $scope.inventoryId});
    };
    vm.loadList();

    vm.extractInputValues = function() {
      var $form = $('#current_user_permissions');
      var permissions = [];

      jQuery.each($form.find('fieldset'), function( i, fieldset ) {
        permissions.push({
          email: $(fieldset).find('input[name=email]').val(),
          role: $(fieldset).find('select').val()
        });
      });
      return permissions;
    };

    $scope.$on('save', function(_, done) {
      vm.savePermissions(vm.extractInputValues(), done);
    });

    vm.savePermissions = function(permissions, done){
      InventoryPermission.update({
        inventory_id: $scope.inventoryId
      }, { permissions: permissions }, function() {
        done();
      });
    };
  }
})();
