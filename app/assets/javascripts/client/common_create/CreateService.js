(function() {
  'use strict';
  angular.module('PDRClient')
      .service('CreateService', CreateService);

  CreateService.$inject = [
    '$window',
    '$location',
    'Assessment',
    'Inventory'
  ];

  function CreateService($window, $location, Assessment, Inventory) {
    var service = this;

    this.loadDistrict = function(district) {
      this.district = district;
    };

    this.setContext = function(context) {
      this.context = context;
    };

    this.formattedDate = function(date) {
      return moment(date).format('ll');
    };

    this.loadScope = function(scope) {
      this.scope = scope;
    };

    this.toggleSavingState = function() {
      this.scope.$emit('toggle-saving-state');
    };

    this.alertError = false;

    this.emitSuccess = function(message) {
      this.scope.$emit('add-assign-alert', {type: 'success', msg: message});
    };

    this.emitError = function(message) {
      this.scope.$emit('add-assign-alert', {type: 'danger', msg: message});
    };

    this.assignAndSaveAssessment = function(assessment) {
      if (assessment.message === null || assessment.message === '') {
        this.alertError = true;
        return;
      }

      if ($window.confirm('Are you sure you want to send out the assessment and invite all your participants?')) {
        this.alertError = false;
        this
            .saveAssessment(assessment, true)
            .then(function() {
              $location.path('/assessments');
            });
      }
    };

    this.saveAssessment = function(assessment, assign) {
      if (assessment.name === '') {
        this.emitError('Assessment needs a name!');
        return;
      }

      assessment.district_id = this.district.id;

      service.toggleSavingState();
      assessment.due_date = moment($("#due-date").val(), 'MM/DD/YYYY').toISOString();

      if (assign) {
        assessment.assign = true;
      }

      return Assessment
          .save({id: assessment.id}, assessment)
          .$promise
          .then(function() {
            service.toggleSavingState();
            service.emitSuccess('Assessment Saved!');
          }, function() {
            service.toggleSavingState();
            service.emitError('Could not save assessment');
          });
    };

    this.assignAndSaveInventory = function(inventory) {
      if (inventory.message === null || inventory.message === '') {
        this.alertError = true;
        return;
      }

      if ($window.confirm('Are you sure you want to start the inventory and invite all your participants?')) {
        this.alertError = false;
        this.saveInventory(inventory, true)
            .then(function() {
              $location.path('/inventories');
            });
      }
    };

    this.saveInventory = function(inventory, assign) {
      if (inventory.name === '') {
        this.emitError('Inventory needs a name!');
        return;
      }

      inventory.district_id = this.district.id;
      service.toggleSavingState();
      inventory.deadline = moment($('#due-date').val(), 'MM/DD/YYYY').toISOString();

      if (assign) {
        inventory.assign = true;
      }

      return Inventory.save({inventory_id: inventory.id}, inventory)
          .$promise
          .then(function() {
            service.toggleSavingState();
            service.emitSuccess('Inventory Saved!');
          }, function() {
            service.toggleSavingState();
            service.emitError('Could not save inventory');
          });
    };
  }
})();
