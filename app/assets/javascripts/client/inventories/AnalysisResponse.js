PDRClient.factory('AnalysisResponse', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/analyses/:analysis_id/analysis_responses/:id'), null, {
      'submit': { method: 'PUT'},
    });
}]);
