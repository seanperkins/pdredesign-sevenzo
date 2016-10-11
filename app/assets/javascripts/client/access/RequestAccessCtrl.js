(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('RequestAccessCtrl', RequestAccessCtrl);

  RequestAccessCtrl.$inject = [
    '$q',
    '$modalInstance',
    '$state',
    'ToolMemberService',
    'toolId',
    'toolType'
  ];

  function RequestAccessCtrl($q, $modalInstance, $state, ToolMemberService, toolId, toolType) {
    var vm = this;

    vm.close = function () {
      $modalInstance.close();
    };

    ToolMemberService.setContext(toolType);

    vm.submitAccessRequest = function () {
      vm.performAccessRequest().then(function () {
        vm.close();
      });
    };

    vm.performAccessRequest = function () {
      var deferred = $q.defer();
      ToolMemberService
        .requestAccess(toolId, vm.accessLevel)
        .then(function () {
          $state.go($state.$current, null, {reload: true});
          deferred.resolve();
        }, deferred.reject);
      return deferred.promise;
    };

  }
})();