(function() {
  'use strict';
  angular.module('PDRClient')
    .directive('searchableList', searchableList);

  function searchableList () {
    return {
      restrict: 'E',
      scope: {
        title: '@'
      },
      replace: true,
      transclude: true,
      templateUrl: 'client/forms/searchable_list.html',
      link: searchableListLink
    }
  };

  function searchableListLink (scope, element, attrs, controller) {
    element.find('.search').on('input', function (event) {
      element.find('.list > div').addClass('javascripted');
      element.find('.list > div').removeClass('odd');

      var searchTerm = event.currentTarget.value;

      _.each( element.find('.list').children(), function (listItemElement) {
        var innerText = (listItemElement.innerText || "").toLowerCase();
        var term = (searchTerm || "").toLowerCase();

        if (innerText.match(term) === null) {
          $(listItemElement).hide();
        } else {
          $(listItemElement).show();
        }
      });

      element.find('.list > div:visible:even').addClass('odd');
    });
  };
})();
