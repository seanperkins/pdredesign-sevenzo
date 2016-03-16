(function() {
  'use strict';
  angular.module('PDRClient')
      .service('InviteService', InviteService);

  InviteService.$inject = [
    '$window',
    '$location',
    'Assessment'
  ];

  function InviteService($window, $location, Assessment) {
    var service = this;

    this.loadDistrict = function(district) {
      this.district = district;
    };

    this.loadScope = function(scope) {
      this.scope = scope;
    };

    this.alertError = false;

    this.emitSuccess = function(message) {
      this.scope.$emit('add_assessment_alert', {type: 'success', msg: message});
    };

    this.emitError = function(message) {
      this.scope.$emit('add_assessment_alert', {type: 'danger', msg: message});
    };

    this.closeAlert = function(index) {
      this.alerts.splice(index, 1);
    };


    this.assignAndSave = function(assessment) {
      if (assessment.message === null || assessment.message === '') {
        this.alertError = true;
        return;
      }

      if ($window.confirm('Are you sure you want to send out the assessment and invite all your participants?')) {
        this.alertError = false;
        this
            .save(assessment, true)
            .then(function() {
              $location.path('/assessments');
            });
      }
    };

    this.save = function(assessment, assign) {
      if (assessment.name === '') {
        this.error('Assessment needs a name!');
        return;
      }

      assessment.district_id = this.district.id;

      this.saving = true;
      assessment.due_date = moment($("#due-date").val(), 'MM/DD/YYYY').toISOString();

      if (assign) {
        assessment.assign = true;
      }

      return Assessment
          .save({id: assessment.id}, assessment)
          .$promise
          .then(function(_data) {
            service.saving = false;
            service.emitSuccess('Assessment Saved!');
          }, function() {
            service.saving = false;
            service.emitError('Could not save assessment');
          });
    };
  }
})();
