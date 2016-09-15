(function () {
  'use strict';

  angular.module('PDRClient')
    .factory('Invitation', Invitation);

  Invitation.$inject = [
    '$resource',
    'UrlService'
  ];

  function Invitation($resource, UrlService) {
    return $resource(UrlService.url('invitations/:token'));
  }
})();
