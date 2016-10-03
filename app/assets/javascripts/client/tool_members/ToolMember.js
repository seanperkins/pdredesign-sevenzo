(function () {
  'use strict';

  angular.module('PDRClient')
    .factory('ToolMember', ToolMember);

  ToolMember.$inject = [
    '$resource',
    'UrlService'
  ];

  function ToolMember($resource, UrlService) {
    var methodOptions = {
      'create': {
        method: 'POST',
        url: UrlService.url('tool_members')
      },
      'grant': {
        method: 'POST',
        params: {
          tool_type: '@tool_type',
          tool_id: '@tool_id',
          id: '@id'
        },
        url: UrlService.url('tool_members/tool_type/:tool_type/tool_id/:tool_id/access_request/:id/grant')
      },
      'deny': {
        method: 'POST',
        params: {
          tool_type: '@tool_type',
          tool_id: '@tool_id',
          id: '@id'
        },
        url: UrlService.url('tool_members/tool_type/:tool_type/tool_id/:tool_id/access_request/:id/deny')
      },
      'revoke': {
        method: 'DELETE',
        params: {
          id: '@id'
        },
        url: UrlService.url('/tool_members/:id')
      },
      'requestAccess': {
        method: 'POST',
        params: {
          tool_type: '@tool_type',
          tool_id: '@tool_id'
        },
        url: UrlService.url('tool_members/tool_type/:tool_type/tool_id/:tool_id/request_access')
      }
    };

    return $resource(UrlService.url('tool_members/tool_type/:tool_type/tool_id/:tool_id'), null, methodOptions);
  }
})();