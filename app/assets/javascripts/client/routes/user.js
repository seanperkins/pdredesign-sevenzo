PDRClient.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider.state('logout', {
      url: '/logout',
      controller: ['$rootScope', '$scope', 'SessionService', '$location',
        function($rootScope, $scope, SessionService, $location) {
          SessionService
            .logout()
            .then(function() {
              $rootScope.$broadcast('session_updated');
              $location.path('/');
            });
      }],
    })
    .state('login_simple', {
      url: '/login',
      views: {
        '': {
          controller: 'LoginCtrl',
          templateUrl: 'client/views/login/login.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })
    .state('login', {
      url: '/login{redirect:.*}',
      views: {
        '': {
          controller: 'LoginCtrl',
          templateUrl: 'client/views/login/login.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })
    .state('reset', {
      url: '/reset',
      views: {
        '': {
          controller: 'ResetPasswordCtrl',
          templateUrl: 'client/views/reset_password/request_reset.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })
    .state('reset_token', {
      url: '/reset/:token',
      views: {
        '': {
          controller: 'ResetPasswordCtrl',
          templateUrl: 'client/views/reset_password/reset.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })
    .state('invite', {
      url: '/invitations/:token',
      views: {
        '': {
          controller: 'InvitationCtrl',
          templateUrl: 'client/views/invitation/redeem.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })
    .state('signup', {
      url: '/signup',
      views: {
        '': {
          controller: '',
          templateUrl: 'client/views/signup/member.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })
    .state('signup_network_partners', {
      url: '/partners',
      views: {
        '': {
          controller: '',
          templateUrl: 'client/views/signup/network_partner.html'
        },
        'sidebar': {
          controller: '',
          templateUrl: 'client/views/sidebar/sidebar_login.html'
        }
      }
    })
    .state('signup_partner', {
      url: '/networks',
      is_network_partner: true,
      views: {
        '': {
          controller: '',
          templateUrl: 'client/views/signup/partner.html'
        },
        'sidebar': {
          controller: '',
          templateUrl: 'client/views/sidebar/register.html'
        }
      }
    })
    .state('signup_educator', {
      url: '/educators',
      views: {
        '': {
          controller: '',
          templateUrl: 'client/views/signup/educator.html'
        },
        'sidebar': {
          controller: '',
          templateUrl: 'client/views/sidebar/educator.html'
        }
      }
    })
    .state('signup_administrator', {
      url: '/administrators',
      is_administrator: true,
      views: {
        '': {
          controller: '',
          templateUrl: 'client/views/signup/administrator.html'
        },
        'sidebar': {
          controller: '',
          templateUrl: 'client/views/sidebar/register.html'
        }
      }
    })
    .state('settings', {
      url: '/settings',
      authenticate: true,
      views: {
        '': {
          controller: 'SettingsCtrl',
          templateUrl: 'client/views/settings/settings.html'
        },
        'sidebar': {
          controller: 'SidebarCtrl',
          templateUrl: 'client/views/sidebar/sidebar_generic.html'
        }
      }
    });

  }
]);
