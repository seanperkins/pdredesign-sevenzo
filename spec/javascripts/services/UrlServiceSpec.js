describe('Service: UrlService', function() {
  var subject;

  beforeEach(module('PDRClient'));
  beforeEach(inject(function($injector) {
    subject = $injector.get('UrlService');
  }));

  describe('#url', function() {
    it('returns a request ready url', function() {
      expect(subject.url('session')).toEqual('/v1/session'); 
    });
  });

});
