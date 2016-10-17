(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('AssessmentLinksCtrl', AssessmentLinksCtrl);


  AssessmentLinksCtrl.$inject = [
    '$scope',
    '$modal',
    '$location',
    '$state',
    '$q',
    'AccessService',
    'SessionService'
  ];

  function AssessmentLinksCtrl($scope, $modal, $location, $state, $q, AccessService, SessionService) {
    var vm = this;

    vm.isNetworkPartner = SessionService.isNetworkPartner;
    AccessService.setContext('assessment');

    vm.createConsensusModal = function () {
      vm.modal = $modal.open({
        templateUrl: 'client/views/modals/create_consensus.html',
        scope: $scope
      });
    };

    vm.popoverContent = function () {
      if (vm.isNetworkPartner()) {
        return vm.networkPartnerPopoverContent;
      }

      return vm.districtMemberPopoverContent;
    };


    vm.requestAccess = function () {
      if (vm.isNetworkPartner()) {
        vm.performAccessRequest(['facilitator']).then(function () {
        });
      } else {
        vm.modal = $modal.open({
          templateUrl: 'client/access/request_access.html',
          scope: $scope,
          windowClass: 'request-access-window'
        });
      }
    };

    vm.close = function () {
      vm.modal.dismiss('cancel');
    };

    vm.redirectToCreateConsensus = function () {
      vm.close();
      $location.url(vm.assessmentLink('new_consensus'));
    };

    vm.submitAccessRequest = function () {
      vm.performAccessRequest(vm.accessLevel).then(function () {
        vm.modal.dismiss('cancel');
      })
    };

    vm.performAccessRequest = function (role) {
      var deferred = $q.defer();
      AccessService
        .save($scope.id, role)
        .then(function () {
          $state.go($state.$current, null, {reload: true});
          deferred.resolve();
        }, deferred.reject);
      return deferred.promise;
    };

    vm.gotoLocation = function (location) {
      if (!location) {
        return;
      }

      if (location.match(/\/assessments\/.*\/consensus$/)) {
        vm.createConsensusModal();
      } else if (location == 'request_access') {
        vm.requestAccess();
      } else {
        $location.url(location);
      }
    };


    vm.assessmentLink = function (type) {
      if (typeof type === 'undefined') {
        return false;
      }

      var routes = {
        "request_access": "request_access",
        "new_consensus": "/assessments/" + $scope.id + "/consensus",
        "dashboard": "/assessments/" + $scope.id + "/dashboard",
        "finish": "/assessments/" + $scope.id + "/assign",
        "report": "/assessments/" + $scope.id + "/report",
        "response": "/assessments/" + $scope.id + "/responses",
        "edit_report": "/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
        "show_report": "/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
        "messages": "/assessments/" + $scope.id + "/dashboard",
        "consensus": "/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
        "show_response": "/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
      };

      return routes[type];
    };
  }
})();