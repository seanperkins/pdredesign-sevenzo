PDRClient.factory('AssessmentPermission', ['$resource', 'UrlService', function($resource, UrlService) {
  var resource_url         = 'assessments/:assessment_id/permissions';
  var single_resource_url  = resource_url + '/:id';

  return $resource(UrlService.url(resource_url), null,
  { 'get':    { url: UrlService.url(single_resource_url), method: 'GET', isArray: false, params: {email: ''} },
    'update': { url: UrlService.url(single_resource_url), method: 'PUT', isArray: false },
    'create': { method: 'POST'},
    'users':  { method: 'GET',
                url: UrlService.url(single_resource_url + '/all_users'),
                isArray: true,
                accept: 'all_users',
                params: {
                  assessment_id: ''
                }
    },
    'level':  { method: 'GET',
                url: UrlService.url(single_resource_url + '/current_level'),
              },
    'accept': { method: 'PUT',
                url: UrlService.url(single_resource_url + '/accept'),
                action: 'accept',
                params: {
                  assessment_id: '',
                  id: ''
                }
    },
    'deny':   { method: 'PUT',
                url: UrlService.url(single_resource_url + '/deny'),
                action: 'deny',
                params: {
                  assessment_id: '',
                  id: ''
                }
              }
  });
}]);
