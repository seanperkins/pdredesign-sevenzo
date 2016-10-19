(function () {
  'use strict';

  angular.module('PDRClient')
    .directive('memberList', memberList);

  function memberList() {
    return {
      restrict: 'E',
      scope: {
        members: '='
      },
      templateUrl: 'client/tool_members/member_list.html'
    }
  }
})();