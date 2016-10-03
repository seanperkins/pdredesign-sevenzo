(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('ResponseStatusCtrl', ResponseStatusCtrl);

  ResponseStatusCtrl.$inject = [
    '$scope',
    '$http',
    'UrlService'
  ];

  function ResponseStatusCtrl($scope, $http, UrlService) {
    var vm = this;
    
    vm.endpoint = function () {
      return UrlService.url('assessments/' +
        $scope.user.assessment_id +
        '/participants/' +
        $scope.user.participant_id +
        '/mail');
    };

    vm.sendEmail = function () {
      vm.getEmailBody().then(function (response) {
        var body = escape(response.data);
        var link = "mailto:" + $scope.user.email + "?subject=Invitation&body=" + body;
        vm.triggerMailTo(link);
      });
    };

    vm.triggerMailTo = function (link) {
      window.top.location = link;
    };

    vm.showMailLink = function () {
      return $scope.user.status === 'invited';
    };

    vm.getEmailBody = function () {
      return $http({method: "GET", url: vm.endpoint()})
        .success(function (response) {
            return response;
          }
        );
    };

    vm.statusMessageIcon = function (status) {
      switch (status) {
        case 'invited':
          return 'fa-envelope-o';
        case 'completed':
          return 'fa-check';
        case 'in_progress':
          return 'fa-spinner';
        default:
          return 'fa-envelope-o';
      }
    };
  }
})();