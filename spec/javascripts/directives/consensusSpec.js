describe('Directive: consensus', function() {
  var $scope,
      $timeout,
      $location,
      $rootScope,
      $httpBackend,
      $q,
      isolatedScope,
      element,
      ConsensusService;

  var score1    = {id: 1, evidence: "hello", value: 1, editMode: null};
  var question1 = {id: 1, score: score1 };
  var answer1   = {id: 1, value: 2};

  beforeEach(module('PDRClient'));

  beforeEach(inject(function($injector) {
    var $compile      = $injector.get('$compile');
    $rootScope        = $injector.get('$rootScope');
    $timeout          = $injector.get('$timeout');
    $location         = $injector.get('$location');
    $stateParams      = $injector.get('$stateParams');
    $httpBackend      = $injector.get('$httpBackend');
    $q                = $injector.get('$q');
    $scope            = $rootScope.$new();
    ConsensusService  = $injector.get('ConsensusService');

    $rootScope.consensus = {id: 1};
    element    = angular.element('<consensus consensus="consensus">'
                               + '</consensus>');

    $compile(element)($scope);
    $scope.$digest();

    isolatedScope = element.isolateScope();
  }));

  describe('#scoreFilter', function(){
    var $filter, scores;

    beforeEach(inject(function($injector) {
      $filter = $injector.get('$filter');
    }));

    it('filters the right scores', function() {
      scores = [{question_id: 1}, {question_id:1}, {question_id:2}];
      expect($filter('scoreFilter')(scores, 1).length).toEqual(2);
      expect($filter('scoreFilter')(scores, 2).length).toEqual(1);
    });
  });

  it('isConsensus will be true by default ', function() {
    expect(isolatedScope.isConsensus).toEqual(true);
  });

  describe('#assignAnswerToQuestion', function() {
    beforeEach(inject(function($injector) {
      isolatedScope.isReadOnly = false;
    }));

    it('will return false if $scope.isReadOnly is true', function() {
      isolatedScope.isReadOnly = true;
      expect(isolatedScope.assignAnswerToQuestion(answer1, question1)).toEqual(false);
    });

    it('isAlert should be true if score evidence is missing', function() {
      var score2 = {id: 1, evidence: "", value: 1, editMode: null};
      var question2 = {id: 1, score: score2 };
      isolatedScope.assignAnswerToQuestion(answer1, question2)
      expect(question2.isAlert).toEqual(true);
    });

    it('does not error on an undefined score', function(){
      var score2 = {id: 1, evidence: "", value: 1, editMode: null};
      var question2 = {id: 1};
      isolatedScope.assignAnswerToQuestion(answer1, question2)
    })

  });

  describe('#updateConsensus', function() {
    beforeEach(inject(function($injector) {
      spyOn(ConsensusService, 'loadConsensus').and.callFake(function () {
        return {
          then: function (callback) {
            return callback({
              scores: [score1],
              categories: [1,2,3],
              team_roles: ['some', 'role'],
              is_completed: true,
              participant_count: 5
            });
          }
        };
      });
    }));

    it('gets data on callback and sets scores, data,' +
       ' categories, isReadOnly, and participantCount', function() {
      isolatedScope.updateConsensus();

      expect(isolatedScope.scores).toEqual([score1]);
      expect(isolatedScope.categories).toEqual([1,2,3]);
      expect(isolatedScope.isReadOnly).toEqual(true);
      expect(isolatedScope.teamRoles).toEqual(['some', 'role']);
      expect(isolatedScope.participantCount).toEqual(5);
    });

    it('sends the teamRole when its set', function() {
      isolatedScope.teamRole = 'some_role';
      isolatedScope.updateConsensus();

      expect(ConsensusService.loadConsensus).toHaveBeenCalledWith(1, 'some_role');
    });

  });

  describe('#updateTeamRole', function(){
    beforeEach(inject(function($injector) {
      spyOn(isolatedScope, 'updateConsensus').and.returnValue($q.when());
    }));

    it('updates the $scope.teamRole var', function(){
      isolatedScope.teamRole = null;
      isolatedScope.updateTeamRole("some_role");
      expect(isolatedScope.teamRole).toEqual('some_role');
    });

    it('updates the $scope.teamRole var to null when empty', function(){
      isolatedScope.teamRole = "some role";
      isolatedScope.updateTeamRole("");
      expect(isolatedScope.teamRole).toEqual(null);
    });

    it('triggers a consensus update', function(){
      isolatedScope.updateTeamRole("some_role");
      expect(isolatedScope.updateConsensus).toHaveBeenCalled();
    });
  });

  describe('#submit_consensus', function() {

    it('calls function redirectToReport()', function(){
      spyOn(ConsensusService, 'submitConsensus').and.callFake(function () {
        return {
          then: function (callback) {
            return callback({
              scores: [score1],
              categories: [1,2,3],
              team_roles: ['some', 'role'],
              is_completed: true,
              participant_count: 5
            });
          }
        };
      });
      spyOn(ConsensusService, 'redirectToReport');
      $rootScope.$broadcast("submit_consensus");

      expect(ConsensusService.redirectToReport).toHaveBeenCalled();
    });

    it('redirects to assessment correct report', function() {
      ConsensusService.setContext("assessment");
      $stateParams.assessment_id = 1;

      ConsensusService.redirectToReport();
      expect($location.path()).toEqual('/assessments/1/report')
    });

  });

});
