PDRClient.service('ConsensusHelper',
  ['$q',
  '$http',
  '$rootScope',
  'Consensus',
  'UrlService',
  function($q, $http, $rootScope, Consensus, UrlService) {
    var $scope = this;

    $scope.downloadAction   = function(data, download_type){
      //download_type, should contain mime_type, file_ext

      if(download_type.file_ext == "pdf"){
        var blob  = new Blob([data], {type: download_type.mime_type});
        var url   = URL.createObjectURL(blob);
      }else{
        var url   = 'data:application/csv;charset=utf-8,' + encodeURI(data);
      }

      var link = angular.element('<a/>');
      link.attr({
         href: url,
         target: '_blank',
         download: 'report.'+download_type.file_ext
      })[0].click();
      $rootScope.$broadcast('stop_building_export_file');
    };

    $scope.consensuToPDF    = function(assessmentId, consensusId){
      var wait_message = "This may take a few moments...Thank you for your patience. If the PDF does not download, please contact us at support@mail.pdredesign.org.";
      var params = {
        assessment_id: assessmentId
      };

      $rootScope.$broadcast('building_export_file', {format: 'PDF'});

      $http.post(UrlService.url('assessments/'+assessmentId+'/reports/consensus_report.pdf'), {}, {responseType: "arraybuffer"}).
        success(function(data, status, headers, config){
          $scope.downloadAction(data, {
            mime_type: 'application/pdf',
            file_ext:  'pdf'
          });
        });
    };

    $scope.consensuToCSV    = function(assessment, consensus_id){
      $rootScope.$broadcast('building_export_file', {format: 'CSV'});
      var report_url        = UrlService.url('assessments/'+assessment.id+'/reports/consensus_report.csv');

      $http.post(report_url, {}).
        success(function(data, status, headers, config){
          $scope.downloadAction(data, {
              mime_type: 'application/csv',
              file_ext:  'csv'
            });
        });
      
    };

  }]);
