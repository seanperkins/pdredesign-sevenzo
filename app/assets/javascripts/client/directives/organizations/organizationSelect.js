PDRClient.directive('organizationSelect', [
  '$q',
  '$timeout',
  'SessionService',
  'UrlService',
  'Organization',
  'User',
  'OrganizationHelper',
  function($q, $timeout, SessionService, UrlService, Organization, User, OrganizationHelper) {
      return {
        restrict: 'E',
        replace: false,
        scope: {
          organizationId: '=',
          messages: '=',
        },
        templateUrl: 'client/views/directives/organization_select.html',
        link: function(scope, elm, attrs) {
          scope.organization = {};

          scope.updateOrganizationId = function(id) {
            scope.organizationId = id;
            _.defer(function(){ scope.$apply(); });
          };

          scope.createOrganization = function(organization) {
            Organization
              .create({name: organization.name})
              .$promise.then(function(result) {
                scope.updateOrganizationId(result.id);
                scope.updateOrganizationObject(result.id);
              });
          };

          scope.updateOrganizationObject = function(id) {
            Organization
              .get({id: id})
              .$promise
              .then(function(org) {
                scope.replaceOptionsWith(org);
              });
          };

          scope.clearOrganization = function() {
            scope.organization   = {};
            scope.organizationId = null;
            _.defer(function(){ scope.$apply(); });
          };

          scope.replaceOptionsWith = function(result) {
            var selectize = scope.selectizeElement();
            selectize.clear();
            selectize.clearOptions();
            selectize.addOption({ name: result.name, id: result.id });
            selectize.setValue(result.name);
          };

          scope.performAction = function(organization) {
            if(organization.id == null && organization.name)
              scope.createOrganization(organization);
            else if(organization.id)
              scope.updateOrganizationId(organization.id);
            else
              scope.clearOrganization();
          };

          scope.selectizeElement = function() {
            return scope.selectize[0] && scope.selectize[0].selectize;
          };

          $timeout(function() {
            scope.selectize = $(elm).find('#organization').selectize({
                valueField:  'name',
                labelField:  'name',
                searchField: 'name',
                maxItems:     1,
                onItemAdd: function(value) {
                  var organization = scope.selectizeElement().options[value];
                  scope.performAction(organization);
                },
                onDelete: function(){
                  scope.clearOrganization();
                },
                create: function(name, callback) {
                  callback(scope.performAction({name: name}));
                },
                render: {
                  item: function(item, escape) {
                    return '<div>' + item.name + '</div>';
                  }
                },
                load: function(query, callback) {
                  if (!query.length) return callback();

                  return OrganizationHelper.searchOrganization(query, callback);
                }
            });
            scope.updateOrganizationObject(scope.organizationId);
          });

          scope.$watch('organizationId', function(id, _oldValue) {
            if(!scope.selectize || !scope.organization) return;
            scope.updateOrganizationObject(id);
          });

        },
     };
}]);
