angular.module("PDRClient").
  factory('Analytics', ['$rootScope', function ($rootScope) {

    var gaId =  "UA-28514425-2";
    var gaDomain = "pdredesign.org";

    if (!window.ga) {
      window.ga = function () {};
    } else {
      // NOTE: GA ignores events from localhost by default.  If you want to
      // test GA locally, you can set google_analytics_domain to "none" in your
      // userVars.json.
      if (gaDomain === 'none') {
        ga('create', gaId, { 'cookieDomain': 'none' });
      } else {
        ga('create', gaId, (gaDomain ? gaDomain : 'auto' ));
      }

      // Required for demographics tracking
      ga('require', 'displayfeatures');
    }

    return {
      setPage: function (url) {
        ga('set', 'page', url);
      },
      pageview: function () {
        ga('send', 'pageview');
      },
      setUserId: function (userid) {
        ga('set', '&uid', userid);
      },
      event: function (category, action, label, value) {
        var args = Array.prototype.slice.call(arguments);
        args.unshift('event');
        args.unshift('send');
        ga.apply(ga, args);
      },
      isEnabled: function () {
        return !!gaId;
      }
    };
  }
]);

angular.module("PDRClient").run([
  '$rootScope',
  '$state',
  '$stateParams',
  '$location',
  'Analytics',
  function ($rootScope, $state, $stateParams, $location, Analytics) {
    $rootScope.$on('$stateChangeSuccess', function() {
      Analytics.setPage($location.url());
      Analytics.pageview();
    });
}]);