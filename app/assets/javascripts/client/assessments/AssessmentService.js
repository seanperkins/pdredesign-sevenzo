(function() {
  'use strict';

  angular.module('PDRClient')
      .service('AssessmentService', AssessmentService);

  AssessmentService.$inject = [
    '$state',
    'SessionService',
    'MailtoHelper',
    'Assessment'
  ];

  function AssessmentService($state, SessionService, MailtoHelper, Assessment) {
    var service = this;

    service.userIsNetworkPartner = SessionService.isNetworkPartner();
    service.currentUser = SessionService.getCurrentUser();

    service.text = function() {
      if (service.userIsNetworkPartner) {
        return 'Recommend Assessment';
      } else {
        return 'Facilitate New Assessment';
      }
    };

    service.sharedUrl = function(token) {
      return $state.href('shared_assessment_report', {token: token}, {absolute: true});
    };

    service.shareMailto = function(assessment) {
      var url = service.sharedUrl(assessment.share_token);
      var options = {
        subject: "Assessment Report: " + assessment.name,
        body: "Hi,\nI would like to share an assessment report for " + assessment.name + "\nPlease click in the link below to access the report:\n" + url + ".\n"
      };
      return MailtoHelper.compose(options);
    };

    service.create = function(assessment) {
      return Assessment.create(assessment).$promise;
    }
  }
})();