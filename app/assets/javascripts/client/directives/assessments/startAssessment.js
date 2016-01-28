PDRClient.directive('startAssessment', [
    function() {
      return {
        restrict: 'E',
        replace: true,
        scope: {},
        templateUrl: 'client/views/directives/start_assessment.html',
        controller: [
          '$scope',
          '$timeout',
          '$location',
          'Rubric',
          'Assessment',
          'SessionService',
          function($scope, $timeout, $location, Rubric, Assessment, SessionService){

          $scope.alerts     = [];
          $scope.assessment = {};

          $scope.user       = SessionService.getCurrentUser();
          $scope.district   = $scope.user.districts[0];

          SessionService.syncUser();

          $scope.text = function(){
            if(SessionService.isNetworkPartner())
              return "Recommend Assessment";
            return "Facilitate New Assessment";
          };

          $scope.isNetworkPartner = function(){
            return SessionService.isNetworkPartner();
          };

          $scope.hideModal = function() {
            $('#startAssessment').modal('hide');
          };

          $scope.noDistrict = function() {
            return _.isEmpty($scope.user.district_ids);
          };

          $scope.redirectToAssessment = function(assessment) {
            $scope.hideModal();
            $location.path('assessments/' + assessment.id + '/assign');
          };

          $scope.create  = function(assessment) {
            assessment.due_date     = moment($("#due-date").val()).toISOString();
            assessment.district_id  = $scope.district.id;

            Assessment
              .create(assessment)
              .$promise
              .then(function(data) {
                $scope.success('Assessment Created.');
                $scope.redirectToAssessment(data);
              }, function(response) {
                var errors = response.data.errors;
                angular.forEach(errors, function(error, field) {
                  $scope.error(field + " : " + error);
                });
              });
          };

          $scope.success = function(message) {
            $scope.alerts.push({type: 'success', msg: message });
          };

          $scope.error   = function(message) {
            $scope.alerts.push({type: 'danger', msg: message });
          };

          $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
          };

          $timeout(function() {
            $scope.datetime = $('.datetime').datetimepicker({
              pickTime: false,
            });

            $scope.datetime.on("dp.change",function (e) {
              $('#due-date').trigger('change');
            });

          });
        }],
      };
    }
]);
