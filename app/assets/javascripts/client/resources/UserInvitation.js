PDRClient.factory('UserInvitation', ['$resource','UrlService',
  function($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/user_invitations'), null,
      { 'create': { method: 'POST'}});
  }
]);
