describe('Controller: AssessmentsCtrl', function() {
  var subject, $scope, $httpBackend, SessionService;

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($controller, $rootScope, $injector) {

    $httpBackend   = $injector.get('$httpBackend');
    SessionService = $injector.get('SessionService');

    spyOn(SessionService, 'getCurrentUser')
      .and.returnValue({role: 'member'});

    $scope    = $rootScope.$new();
    subject  = $controller('AssessmentsCtrl', {
      $scope: $scope,
      assessments: {}
    });

  }));


  it('orderLinks sets Dashboard to be first and Report to be last.', function() {
    var links = {
      consensus: {
        title: "Consensus",
      },
      report: {
        title: "Report",
      },
      dashboard: {
        title: "View Dashboard",
      }
    };

    var sortedLinks = $scope.orderLinks(links);

    expect(sortedLinks[0].title).toEqual("View Dashboard");
    expect(sortedLinks[1].title).toEqual("Consensus");
    expect(sortedLinks[2].title).toEqual("Report");

  });

  it('orderLinks sets Report to be last.', function() {
    var links = {
      report: {
        title: "Report",
        active: false,
        type: "report"
      },
      finish: {
        title: "Finish & Assign",
        active: true,
        type: "finish"
      },
      consensus: {
        title: "Consensus",
        active: true,
        type: "new_consensus"
      },
    };

    var sortedLinks = $scope.orderLinks(links);

    expect(sortedLinks[0].title).toEqual("Finish & Assign");
    expect(sortedLinks[1].title).toEqual("Report");
    expect(sortedLinks[2].title).toEqual("Consensus");


  });

  describe('#districtOptions', function(){
    it('returns all unique districts', function(){
     var assessments = [
        {district_name: 'first'},
        {district_name: 'first'},
        {district_name: 'second'},
        {district_name: 'second'}
      ];

      var districts = $scope.districtOptions(assessments);
      expect(districts).toEqual(['first', 'second'])
    });
  });
  describe('#statusesOptions', function(){
    it('returns all unique statuses', function(){
     var assessments = [
        {status: 'draft'},
        {status: 'consensus'},
        {status: 'draft'},
        {status: 'consensus'}
      ];

      var statuses = $scope.statusesOptions(assessments);
      expect(statuses).toEqual(['draft', 'consensus'])
    });
  });

  describe('#permissionsFilter', function(){
    it('Organizer should return is_facilitator true', function() {
       var permission = $scope.permissionsFilter('Organizer');
      expect(permission).toEqual({ is_facilitator : true })
    });

    it('Participant should return is_participant true', function() {
      var permission = $scope.permissionsFilter('Observer');
      expect(permission).toEqual({ is_participant : true  })
    });
  });

  it('#roundNumber rounds', function(){
    expect($scope.roundNumber(50.999)).toEqual(50);
  });

  it('#meetingTime returns formattd date', function(){
    expect($scope.meetingTime(null))
      .toEqual("TBD");

    expect($scope.meetingTime("Jan 1, 1999"))
      .toEqual("1st Jan 1999");
  });

  it('#consensusReportIcon returns correct icon', function() {
    var assessment = {
      consensus: {
        is_completed: true
      }
    };

    expect($scope.consensusReportIcon(assessment))
      .toEqual("fa-check");

  });

});
