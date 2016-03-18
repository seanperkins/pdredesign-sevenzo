(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('EntityDetailsCtrl', EntityDetailsCtrl);


  EntityDetailsCtrl.$inject = [
    'SessionService'
  ];

  function EntityDetailsCtrl(SessionService) {
    var vm = this;

    vm.user = SessionService.getCurrentUser();
    vm.district = vm.user.districts[0];
  }

})();