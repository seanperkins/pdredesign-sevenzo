(function() {
  'use strict';

  angular.module('PDRClient')
      .service('EntryItemService', EntryItemService);

  function EntryItemService() {
    var service = this;

    service.orderLinks = function(items) {
      var filteredArray = [];
      angular.forEach(items, function(item) {
        var title = item.title.toLowerCase();
        switch (true) {
          case title === 'complete survey':
            item.order = 0;
          case title === 'view dashboard':
            item.order = 1;
            break;
          case title === 'view consensus':
            item.order = 2;
            break;
          case title === 'finish & assign':
            item.order = 3;
            break;
          default:
            item.order = 4;
            break;
        }
        filteredArray.push(item);
      });

      /* Sorts links so Dashboard is first
       and Report is last.
       */

      filteredArray.sort(function(a, b) {
        switch (true) {
          case a.order < b.order:
            return -1;
          case a.order == b.order:
            return 0;
          case a.order > b.order:
          default:
            return 1;
        }
      });
      return filteredArray;
    };
  }
})();