(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('MessageElementCtrl', MessageElementCtrl);

  function MessageElementCtrl() {
    var vm = this;
    vm.messageTitle = function(category) {
      switch (category) {
        case 'welcome':
          return 'Welcome Invite';
        case 'reminder':
          return 'Individual Inventory Reminder';
        default:
          return 'General Message';
      }
    };

    vm.messageIcon = function(category) {
      switch (category) {
        case 'welcome':
          return 'fa-envelope-o';
        case 'reminder':
          return 'fa-clock-o';
        default:
          return 'fa-envelope-o';
      }
    };
  }
})();