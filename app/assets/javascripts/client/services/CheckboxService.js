(function() {
  angular.module('PDRClient')
      .service('CheckboxService', CheckboxService);

  function CheckboxService() {
    var checkboxize = function ($scope, scopeKey, options, property, key) {
      $scope[scopeKey] = _.map(options, function (value) {
        var selected = _.include( property[key], value);
        return {name : value, selected: selected};
      });

      $scope.$watch( scopeKey, function (newValue) {
        var selectedValues = _.pluck(_.filter(newValue, {selected: true}), 'name');
        property[key] = selectedValues;
      }, true);
    };

    return {
      checkboxize: checkboxize
    };
  }
})();
