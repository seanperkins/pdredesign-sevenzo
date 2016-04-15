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

    service.loadDistrict = function(district) {
      service.district = district;
    };

    service.extractId = function() {
      return $stateParams.inventory_id || $stateParams.assessment_id || $stateParams.id;
    };

    service.extractCurrentDistrict = function(user, entity) {
      var result = user.districts[0];
      for (var i = 0; i < user.districts.length; i++) {
        if (entity.district_id === user.districts[i].id) {
          result = user.districts[i];
          break;
        }
      }
      return result;
    };

    service.setContext = function(context) {
      service.context = context;
    };

    service.formattedDate = function(date) {
      return moment(date).format('ll');
    };

    service.loadScope = function(scope) {
      service.scope = scope;
    };

    service.toggleSavingState = function() {
      service.scope.$emit('toggle-saving-state');
    };

    service.alertError = false;

    service.emitSuccess = function(message) {
      service.scope.$emit('add-assign-alert', {type: 'success', msg: message});
    };

    service.emitError = function(message) {
      service.scope.$emit('add-assign-alert', {type: 'danger', msg: message});
    };

    service.assignAndSaveAssessment = function(assessment) {
      if (assessment.message === null || assessment.message === '') {
        service.alertError = true;
        return;
      }

      if ($window.confirm('Are you sure you want to send out the assessment and invite all your participants?')) {
        service.alertError = false;
        this
            .saveAssessment(assessment, true)
            .then(function() {
              $location.path('/assessments');
            });
      }
    };

    service.saveAssessment = function(assessment, assign) {
      if (assessment.name === '') {
        service.emitError('Assessment needs a name!');
        return;
      }

      assessment.district_id = service.district.id;

      service.toggleSavingState();
      assessment.due_date = moment($("#due-date").val(), 'MM/DD/YYYY').toISOString();

      if (assign) {
        assessment.assign = true;
      }

      return Assessment
          .save({id: service.extractId()}, assessment)
          .$promise
          .then(function() {
            service.toggleSavingState();
            service.emitSuccess('Assessment Saved!');
          }, function() {
            service.toggleSavingState();
            service.emitError('Could not save assessment');
          });
    };

    service.assignAndSaveInventory = function(inventory) {
      if (inventory.message === null || inventory.message === '') {
        service.alertError = true;
        return;
      }

      if ($window.confirm('Are you sure you want to start the inventory and invite all your participants?')) {
        service.alertError = false;
        service.saveInventory(inventory, true)
            .then(function() {
              $location.path('/inventories');
            });
      }
    };

    service.saveInventory = function(inventory, assign) {
      if (inventory.name === '') {
        service.emitError('Inventory needs a name!');
        return;
      }

      inventory.district_id = service.district.id;
      service.toggleSavingState();
      inventory.deadline = moment($('#due-date').val(), 'MM/DD/YYYY').toISOString();

      if (assign) {
        inventory.assign = true;
      }

      return Inventory.save({inventory_id: service.extractId()}, {inventory: inventory})
          .$promise
          .then(function() {
            service.toggleSavingState();
            service.emitSuccess('Inventory Saved!');
          }, function() {
            service.toggleSavingState();
            service.emitError('Could not save inventory');
          });
    };

    service.save = function(entity) {
      if(service.context === 'assessment') {
        service.saveAssessment(entity);
      } else if(service.context === 'inventory') {
        service.saveInventory(entity);
      }
    };

    service.loadParticipants = function() {
      if (service.context === 'assessment') {
        return Participant.query({assessment_id: service.extractId()});
      } else if (service.context === 'inventory') {
        return InventoryParticipant.query({inventory_id: service.extractId()});
      }
    };

    service.removeParticipant = function(participant) {
      if (service.context === 'assessment') {
        return Participant.delete({
          assessment_id: service.extractId(),
          id: participant.participant_id
        }, {user_id: participant.id}).$promise;
      } else if (service.context === 'inventory') {
        return InventoryParticipant.delete({
          inventory_id: service.extractId(),
          id: participant.participant_id
        }).$promise;
      }
    };

    service.updateParticipantList = function() {
      if (service.context === 'assessment') {
        return Participant.query({assessment_id: service.extractId()})
            .$promise;
      } else if (service.context === 'inventory') {
        return InventoryParticipant.query({inventory_id: service.extractId()})
            .$promise;
      }
    };

    service.updateInvitableParticipantList = function() {
      if (service.context === 'assessment') {
        return Participant.all({assessment_id: service.extractId()})
            .$promise;
      } else if (service.context === 'inventory') {
        return InventoryParticipant.all({inventory_id: service.extractId()})
            .$promise;
      }
    };

    service.createParticipant = function(user) {
      if (service.context === 'inventory') {
        return InventoryParticipant.create({
          inventory_id: service.extractId()
        }, {user_id: user.id}).$promise;
      }
    };
  }
})();
