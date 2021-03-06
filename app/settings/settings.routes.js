(function() {
  'use strict';

  angular.module('tc.settings').config([
    '$stateProvider',
    '$locationProvider',
    routes
  ]);

  function routes($stateProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    var states = {
      'settings': {
        parent: 'root',
        abstract: false,
        url: '/settings/',
        templateUrl: 'settings/settings.html',
        controller: 'SettingsController',
        controllerAs: 'settings',
        data: {
          authRequired: true
        },
        resolve: {
          userHandle: ['UserService', function(UserService) {
            return UserService.getUserIdentity().handle;
          }],
          userData: ['userHandle', 'ProfileService', function(userHandle, ProfileService) {
            return ProfileService.getUserProfile(userHandle);
          }]
        },
      },
      'settings.profile': {
        url: 'profile/',
        templateUrl: 'settings/edit-profile/edit-profile.html',
        controller: 'EditProfileController',
        controllerAs: 'vm',
        data: {
          title: 'Edit Profile'
        }
      },
      'settings.account': {
        url: 'account/',
        templateUrl: 'settings/account-info/account-info.html',
        controller: 'AccountInfoController',
        controllerAs: 'vm',
        data: {
          title: 'Account Info'
        }
      },
      'settings.preferences': {
        url: 'preferences/',
        templateUrl: 'settings/preferences/preferences.html',
        controller: 'PreferencesController',
        controllerAs: 'vm',
        data: {
          title: 'Preferences'
        }
      }
    };

    for (var name in states) {
      var state = states[name];
      $stateProvider.state(name, state);
    }
  }
})();
