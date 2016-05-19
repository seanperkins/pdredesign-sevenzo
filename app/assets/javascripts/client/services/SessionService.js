(function() {
  'use strict';

  angular.module('PDRClient')
      .service('SessionService', SessionService);

  SessionService.$inject = [
    'UrlService',
    '$http',
    '$location',
    '$q',
    '$rootScope',
    '$state',
    'User'
  ];

  function SessionService(UrlService, $http, $location, $q, $rootScope, $state, User) {
    var userIsAuthenticated = false;
    var service = this;
    var user = null;

    $rootScope.$on('clear_user', function() {
      service.clear();
      $state.go('login');
    });

    function setCurrentUser(usr) {
      user = usr;
      userIsAuthenticated = true;
      var stringy = JSON.stringify(user);
      localStorage.setItem('user', stringy);
    }

    this.userRole = function() {
      return user && user.role;
    };

    this.isNetworkPartner = function() {
      return service.userRole() === "network_partner";
    };

    this.syncAndRedirect = function(url) {
      return this.syncUser().then(function() {
        return $location.path(url);
      });
    };

    this.syncUser = function() {
      var deferred = $q.defer();

      User.get()
          .$promise
          .then(function(usr) {
            setCurrentUser(usr);
            deferred.resolve(usr);
          }, function() {
            deferred.reject(false);
          });

      return deferred.promise;
    };

    this.softLogin = function() {
      var localUser = localStorage.getItem('user');
      if (localUser !== null && typeof localUser !== 'undefined') {
        setCurrentUser(JSON.parse(localUser));
        this.syncUser();
      }
    };

    this.softLogin();

    this.getUserAuthenticated = function() {
      return userIsAuthenticated;
    };

    this.getCurrentUser = function() {
      return user;
    };

    this.clear = function() {
      user = null;
      userIsAuthenticated = false;
      localStorage.clear();
    };

    this.logout = function() {
      var deferred = $q.defer();

      $http({
        method: 'DELETE',
        url: UrlService.url('users/sign_out'),
        data: {}
      }).then(function() {
        service.clear();
        deferred.resolve(true);
      });

      return deferred.promise;
    };

    this.authenticate = function(email, password) {
      var deferred = $q.defer();

      $http({
        method: 'POST',
        url: UrlService.url('users/sign_in'),
        data: {email: email, password: password}
      }).then(function(response) {
        var responseUser = response.data.user;
        setCurrentUser(responseUser);
        deferred.resolve(responseUser);
      }, function() {
        service.clear();
        deferred.reject(false);
      });

      return deferred.promise;
    };

    this.setUserTemplate = function(scope, loggedInTemplate, loggedOutTemplate) {
      if (service.getUserAuthenticated()) {
        scope.template = loggedInTemplate;
      } else {
        scope.template = loggedOutTemplate;
      }
    };
  }
})();
