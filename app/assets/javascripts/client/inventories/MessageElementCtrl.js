(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('MessageElementCtrl', MessageElementCtrl);

  MessageElementCtrl.$inject = ['$scope'];

  function MessageElementCtrl($scope) {
    var vm = this;
    vm.message = $scope.message;
    var kind = $scope.kind || 'Inventory';
    vm.title = {
      'welcome': 'Welcome Invite',
      'reminder': 'Individual ' + kind + ' Reminder',
    }[vm.message.category] || 'General Message';
    vm.icon = {
      'welcome': 'fa-envelope-o',
      'reminder': 'fa-clock-o',
    }[vm.message.category] || 'fa-envelope-o';
  }
})();
