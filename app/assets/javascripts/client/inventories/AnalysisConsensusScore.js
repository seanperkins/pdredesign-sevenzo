PDRClient.factory('AnalysisConsensusScore', ['$resource', 'UrlService', function($resource, UrlService) {
    return $resource(UrlService.url('inventories/:inventory_id/analyses/:analysis_id/analysis_responses/:response_id/scores/:id'), null,
    { 'save': { method: 'POST'},
    });
}]);
