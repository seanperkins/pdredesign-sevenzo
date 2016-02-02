describe('Integration: BrowserDetection', function() {
  var subject;

  beforeEach(function() {
    subject = BrowserDetector;
  });

  it("Detects if the users browser is valid", function() {
    expect(subject.isBrowserValid({firefox: true, version: "17"})).toEqual(true);
    expect(subject.isBrowserValid({firefox: true, version: "16"})).toEqual(false);

    expect(subject.isBrowserValid({chrome: true, version: "23"})).toEqual(true);
    expect(subject.isBrowserValid({chrome: true, version: "22"})).toEqual(false);

    expect(subject.isBrowserValid({safari: true, version: "6"})).toEqual(true);
    expect(subject.isBrowserValid({safari: true, version: "5"})).toEqual(false);

    expect(subject.isBrowserValid({msie: true, version: "10"})).toEqual(true);
    expect(subject.isBrowserValid({msie: true, version: "8"})).toEqual(false);
  });

  it("redirects a user to the invalid page", function(){
    spyOn(BrowserDetector, 'redirect');
    BrowserDetector.redirectInvalidBrowser({msie: true, version: "7"});
    expect(BrowserDetector.redirect).toHaveBeenCalled();
  });

  it("does not redirect a valid browser", function(){
    spyOn(BrowserDetector, 'redirect');
    BrowserDetector.redirectInvalidBrowser({msie: true, version: "10"});
    expect(BrowserDetector.redirect).not.toHaveBeenCalled();
  });

});
