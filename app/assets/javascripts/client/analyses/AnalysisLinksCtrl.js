(function () {
  'use strict';

  angular.module('PDRClient')
    .controller('AnalysisLinksCtrl', AnalysisLinksCtrl);

  AnalysisLinksCtrl.$inject = [
    '$scope',
    '$modal',
    '$q',
    '$state',
    'EntryItemService',
    'AccessService'
  ];

  function AnalysisLinksCtrl($scope, $modal, $q, $state, EntryItemService, AccessService) {
    var vm = this;
    AccessService.setContext('analysis');

    vm.orderLinks = function (items) {
      return EntryItemService.orderLinks(items);
    };

    // Baggage - defined on scope to preserve behavior with assessmentLinks
    // Will want to refactor into directive

    $scope.requestAccess = function () {
      $scope.modal = $modal.open({
        templateUrl: 'client/access/request_access.html',
        controller: 'RequestAccessCtrl as vm',
        windowClass: 'request-access-window',
        resolve: {
          toolId: function () {
            return $scope.entity.id;
          },
          toolType: function () {
            return 'analysis';
          }
        }
      })
    };

    $scope.close = function () {
      $scope.modal.dismiss('cancel');
    };

    $scope.submitAccessRequest = function (roles) {
      $scope.performAccessRequest(roles).then(function () {
        $scope.modal.dismiss('cancel');
      })
    };

    $scope.performAccessRequest = function (role) {
      var deferred = $q.defer();
      AccessService
        .save($scope.entity.id, role)
        .then(function () {
          $state.go($state.$current, null, {reload: true});
          deferred.resolve();
        }, deferred.reject);
      return deferred.promise;
    };

    vm.invokeAction = function (link) {
      switch (link.type) {
        case 'request_access':
          $scope.requestAccess();
          return;
        default:
          return;
      }
    };

    vm.location = function (link) {
      var analysis_route_stem = '#/inventories/' + $scope.entity.inventory_id + '/analyses/' + $scope.entity.id;
      switch (link.type) {
        case 'finish':
          return analysis_route_stem + '/assign';
        case 'dashboard':
          return analysis_route_stem + '/dashboard';
        case 'consensus':
          return analysis_route_stem + '/consensus';
        case 'report':
          return analysis_route_stem + '/report';
        default:
          return '';
      }
    }
  }
})();