PDRClient.directive('assessmentLinks', [
    function() {
      return {
        restrict: 'E',
        replace: false,
        scope: {},
        templateUrl: 'client/views/directives/assessment_index_links.html',
        link: function(scope, elm, attrs) {
          scope.active = attrs.active;
          scope.title  = attrs.title;
          scope.type   = attrs.type;
          scope.role   = attrs.role;
          scope.id     = attrs.id;
          scope.consensusId = attrs.consensusId;
        },
        controller: [
          '$scope',
          '$modal',
          '$rootScope',
          '$location',
          '$timeout',
          '$state',
          '$q',
          'AccessService',
          'SessionService',
          function($scope, $modal, $rootScope, $location, $timeout, $state, $q, AccessService, SessionService) {
            $scope.isNetworkPartner = SessionService.isNetworkPartner;
            AccessService.setContext('assessment');

            $scope.createConsensusModal = function() {
              $scope.modal = $modal.open({
                templateUrl: 'client/views/modals/create_consensus.html',
                scope: $scope
              });
            };

            $scope.popoverContent = function() {
              if($scope.isNetworkPartner())
                return $scope.networkPartnerPopoverContent;

              return $scope.districtMemberPopoverContent;
            };


            $scope.requestAccess = function() {
              if($scope.isNetworkPartner()) {
                $scope.performAccessRequest('facilitator').then(function() {});
              } else {
                $scope.modal = $modal.open({
                  templateUrl: 'client/access/request_access.html',
                  scope: $scope,
                  windowClass: 'request-access-window'
                });
              }
            };

            $scope.close = function() {
              $scope.modal.dismiss('cancel');
            };

            $scope.redirectToCreateConsensus = function() {
              $scope.close();
              $location.url($scope.assessmentLink('new_consensus', true));
            };

            $scope.submitAccessRequest = function(roles) {
              $scope.performAccessRequest(roles).then(function() {
                $scope.modal.dismiss('cancel');
              })
            };

            $scope.performAccessRequest = function(role) {
              var deferred = $q.defer();
              AccessService
                  .save($scope.id, role)
                  .then(function() {
                    $state.go($state.$current, null, {reload: true});
                    deferred.resolve();
                  }, deferred.reject);
              return deferred.promise;
            };

            $scope.gotoLocation   = function(location) {
              if(!location) return;

              if(location.match(/\/assessments\/.*\/consensus$/))
                $scope.createConsensusModal();
              else if(location == 'request_access')
                $scope.requestAccess();
              else
                $location.url(location);
            };

            $scope.assessmentLink = function(type, active) {
              if(typeof type === 'undefined')
                return false;

              routes = {
                "request_access": "request_access",
                "new_consensus": "/assessments/" + $scope.id + "/consensus",
                "dashboard":     "/assessments/" + $scope.id + "/dashboard",
                "consensus":     "/assessments/" + $scope.id + "/consensus",
                "finish":        "/assessments/" + $scope.id + "/assign",
                "report":        "/assessments/" + $scope.id + "/report",
                "response":      "/assessments/" + $scope.id + "/responses",
                "edit_report":   "/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
                "show_report":   "/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
                "messages":      "/assessments/" + $scope.id + "/dashboard",
                "consensus":     "/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
                "show_response": "/assessments/" + $scope.id + "/consensus/" + $scope.consensusId,
              };

              return routes[type];
            };

        }],

      };
    }
]);
