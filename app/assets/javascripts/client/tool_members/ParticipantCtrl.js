(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('ParticipantCtrl', ParticipantCtrl);

  ParticipantCtrl.$inject = [
    '$scope',
    '$filter'
  ];

  function ParticipantCtrl($scope, $filter) {
    var vm = this;
    vm.statusDate = $filter('amDateFormat')($scope.user.status_date, 'MMMM Do, YYYY');
  }
})();