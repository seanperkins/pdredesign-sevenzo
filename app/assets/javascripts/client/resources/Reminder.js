PDRClient.factory('Reminder', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('assessments/:assessment_id/reminders'));
}]);
