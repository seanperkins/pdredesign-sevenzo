(function() {
  'use strict';

  angular.module('PDRClient')
      .controller('EntryCtrl', EntryCtrl);

  EntryCtrl.$inject = [
    '$location',
    'SessionService',
    'EntryItemService'
  ];

  function EntryCtrl($location, SessionService, EntryItemService) {
    var vm = this;

    vm.isNetworkPartner = function() {
      return SessionService.isNetworkPartner();
    };

    vm.meetingTime = function(date) {
      if (date != null) {
        return moment(date, 'YYYY-MM-DDTHH:mm:ss').format('Do MMM YYYY');
      } else {
        return 'TBD';
      }
    };

    vm.gotoLocation = function(location) {
      if (location) {
        $location.url(location);
      }
    };


    vm.activeAssessmentLink = function(entity) {
      if (vm.responseLink(entity)) {
        return 'active';
      } else {
        return '';
      }
    };

    vm.responseLink = function(entity) {
      switch (entity.response_link) {
        case 'new_response':
          return '/assessments/' + entity.id + '/responses';
        case 'response':
          return '/assessments/' + entity.id + '/responses/' + entity.responses[0].id;
        case 'consensus':
          return '/assessments/' + entity.id + '/consensus/' + entity.consensus.id;
        case 'none':
          return false;
      }
    };

    vm.orderLinks = function(items) {
      return EntryItemService.orderLinks(items);
    }
  }
})();
