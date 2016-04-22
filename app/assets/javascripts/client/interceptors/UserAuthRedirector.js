PDRClient.factory('UserAuthRedirector',[
    '$q', '$location', '$rootScope',
    function($q, $location, $rootScope){
      var sessionRecoverer = {
        responseError: function(response) {
          if (response.status == 401 
              && response.data.error == "You need to sign in or sign up before continuing.") {
            $rootScope.$emit('clear_user');
          }
          return $q.reject(response);
        }
      };
      return sessionRecoverer;
}]);

PDRClient.config(['$httpProvider',function($httpProvider) {
  $httpProvider.interceptors.push('UserAuthRedirector');
}]);
