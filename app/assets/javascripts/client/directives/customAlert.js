PDRClient.directive('customalert', function () {
  return {
    restrict:'EA',
    templateUrl: 'client/views/shared/customalert.html',
    replace: true,
    scope: {
      type: '@',
      message: '@'
    },
    link: function(scope, elm, attrs) {
      switch(scope.type) {
        case 'error':
          return scope.isError = true;
        case 'success':
          return scope.isSuccess = true;
      }
    }

  };
});
