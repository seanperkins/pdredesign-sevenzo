(function() {
  'use strict';

  describe('Service: Alert', function() {
    var subject;

    beforeEach(function() {
      module('PDRClient');
      inject(function(_AlertService_) {
        subject = _AlertService_;
      });
    });

    describe('#addAlert', function() {
      it('adds an alert', function() {
        subject.addAlert('foo', 'bar');
        expect(subject.alerts[0]).toEqual({type: 'foo', message: 'bar'});
      });
    });

    describe('#closeAlert', function() {
      beforeEach(function() {
        subject.alerts.push({type: 'foo', message: 'baz'});
      });

      it('removes the alert at the specified index', function() {
        expect(subject.alerts[0]).toBeDefined();
        subject.closeAlert(0);
        expect(subject.alerts[0]).not.toBeDefined();
      });
    });

    describe('#getAlerts', function() {
      beforeEach(function() {
        subject.alerts.push({type: 'foo', message: 'baz'});
      });

      it('retrieves the current alerts', function() {
        expect(subject.getAlerts()).toEqual([{type: 'foo', message: 'baz'}]);
      });
    });

    describe('#flush', function() {
      beforeEach(function() {
        subject.alerts.push({type: 'foo', message: 'baz'});
        subject.alerts.push({type: 'bar', message: 'baz'});
        subject.alerts.push({type: 'quuz', message: 'baz'});
      });

      it('removes all alerts from the service', function() {
        expect(subject.alerts.length).toEqual(3);
        subject.flush();
        expect(subject.alerts.length).toEqual(0);
      });
    });
  });
})();