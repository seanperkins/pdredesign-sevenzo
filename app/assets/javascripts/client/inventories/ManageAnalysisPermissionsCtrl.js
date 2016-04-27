(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('ManageAnalysisPermissionsCtrl', ManageAnalysisPermissionsCtrl);

  ManageAnalysisPermissionsCtrl.$inject = [
    '$scope',
    '$stateParams',
    'AnalysisPermission'
  ];

  function ManageAnalysisPermissionsCtrl($scope, $stateParams, AnalysisPermission) {
    var vm = this;

    vm.loadList = function() {
      vm.list = AnalysisPermission.list({
         inventory_id: $stateParams.inventory_id,
         analysis_id: $stateParams.id
      });
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

    $scope.$on('save', function() {
      vm.savePermissions(vm.extractInputValues());
    });

    vm.savePermissions = function(permissions){
      AnalysisPermission.update({
        inventory_id: $stateParams.inventory_id,
        analysis_id: $stateParams.id
      }, { permissions: permissions }, function() {
        $scope.$emit('close-modal');
      });
    };
  }
})();
