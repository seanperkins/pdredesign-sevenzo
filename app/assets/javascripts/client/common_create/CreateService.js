(function() {
  'use strict';
  angular.module('PDRClient')
      .service('CreateService', CreateService);

  CreateService.$inject = [
    '$window',
    '$location',
    '$stateParams',
    'Assessment',
    'Inventory',
    'Participant',
    'InventoryParticipant'
  ];

  function CreateService($window, $location, $stateParams, Assessment, Inventory, Participant, InventoryParticipant) {
    var service = this;

    this.loadDistrict = function(district) {
      this.district = district;
    };

    this.extractCurrentDistrict = function(user, entity) {
      var result = user.districts[0];
      for (var i = 0; i < user.districts.length; i++) {
        if (entity.district_id === user.districts[i].id) {
          result = user.districts[i];
          break;
        }
      }
      return result;
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

      return Inventory.save({inventory_id: inventory.id}, {inventory: inventory})
          .$promise
          .then(function() {
            service.toggleSavingState();
            service.emitSuccess('Inventory Saved!');
          }, function() {
            service.toggleSavingState();
            service.emitError('Could not save inventory');
          });
    };

    this.save = function(entity) {
      if(service.context === 'assessment') {
        this.saveAssessment(entity);
      } else if(service.context === 'inventory') {
        this.saveInventory(entity);
      }
    };

    this.loadParticipants = function() {
      if (service.context === 'assessment') {
        return Participant.query({assessment_id: $stateParams.id});
      } else if (service.context === 'inventory') {
        return InventoryParticipant.query({inventory_id: $stateParams.id});
      }
    };

    this.removeParticipant = function(participant) {
      if (service.context === 'assessment') {
        return Participant.delete({
          assessment_id: $stateParams.id,
          id: participant.participant_id
        }, {user_id: participant.id}).$promise;
      } else if (service.context === 'inventory') {
        return InventoryParticipant.delete({
          inventory_id: $stateParams.id,
          id: participant.participant_id
        }).$promise;
      }
    };

    this.updateParticipantList = function() {
      if (service.context === 'assessment') {
        return Participant.query({assessment_id: $stateParams.id})
            .$promise;
      } else if (service.context === 'inventory') {
        return InventoryParticipant.query({inventory_id: $stateParams.id})
            .$promise;
      }
    };

    this.updateInvitableParticipantList = function() {
      if (service.context === 'assessment') {
        return Participant.all({assessment_id: $stateParams.id})
            .$promise;
      } else if (service.context === 'inventory') {
        return InventoryParticipant.all({inventory_id: $stateParams.id})
            .$promise;
      }
    };

    this.createParticipant = function(user) {
      if (service.context === 'inventory') {
        return InventoryParticipant.create({
          inventory_id: $stateParams.id
        }, {user_id: user.id}).$promise;
      }
    };
  }
})();
