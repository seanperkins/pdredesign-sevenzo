(function() {
  'use strict';
  
  angular.module('PDRClient')
      .directive('messageElement', messageElement);
  
  function messageElement() {
    return {
      restrict: 'E',
      replace: true,
      transclude: true,
      scope: {
        message: '='
      },
      templateUrl: 'client/inventories/message_element.html',
      controller: 'MessageElementCtrl',
      controllerAs: 'messageElement'
    }
  }
})();