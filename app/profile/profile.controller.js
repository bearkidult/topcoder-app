(function () {
  'use strict';

  angular.module('tc.profile').controller('ProfileCtrl', ProfileCtrl);

  ProfileCtrl.$inject = ['CONSTANTS', '$log', '$q',
    'TcAuthService', 'UserService', 'ProfileService', 'ChallengeService', 'ExternalAccountService',
    'userHandle', 'profile', 'ngDialog', '$anchorScroll'
  ];

  function ProfileCtrl(CONSTANTS, $log, $q, TcAuthService, UserService, ProfileService, ChallengeService, ExternalAccountService, userHandle, profile, ngDialog, $anchorScroll) {
    var vm = this;
    // set profile to the object that was resolved
    vm.profile = profile;
    vm.userHandle = userHandle;
    vm.showBadges = showBadges;
    vm.closeDialog = closeDialog;
    vm.scrollTo = scrollTo;

    vm.imgMap = {
      'DEVELOP': 'develop',
      'DESIGN': 'design',
      'DATA_SCIENCE': 'data',
      'COPILOT': 'copilot'
    };

    $log.debug();
    vm.status = {
      'badges': CONSTANTS.STATE_LOADING,
      'stats': CONSTANTS.STATE_LOADING,
      'skills': CONSTANTS.STATE_LOADING,
      'externalLinks': CONSTANTS.STATE_LOADING
    };

    activate();

    // adding stats promise on scope so child states can use this.
    vm.statsPromise = ProfileService.getUserStats(vm.userHandle).then(function(stats) {
      if (stats) {
        vm.stats = stats;
        vm.profile.tracks = vm.profile.tracks || ProfileService.getTracks(vm.stats) || [];
        if (stats.COPILOT && stats.COPILOT.contests && vm.profile.tracks.indexOf('COPILOT') == -1) {
          vm.profile.tracks.push('COPILOT');
        }
        vm.numProjects = vm.stats.challenges;
        vm.numWins = vm.stats.wins;
        vm.categories = ProfileService.getRanks(vm.stats);
      } else {
        vm.stats = false;
        vm.profile.tracks = [];
        vm.numProjects = 0;
        vm.numWins = 0;
        vm.categories = [];
      }
      vm.status.stats = CONSTANTS.STATE_READY;
      return vm.stats;
    }).catch(function(err) {
      $log.error(err);
      vm.status.stats = CONSTANTS.STATE_ERROR;
    });

    vm.skillsPromise = ProfileService.getUserSkills(vm.userHandle).then(function(skills) {
      vm.skills = skills.skills;
      vm.status.skills = CONSTANTS.STATE_READY;
    }).catch(function(err) {
      vm.status.skills = CONSTANTS.STATE_ERROR;
    });

    function activate() {
      $log.debug('Calling ProfileController activate()');
      // show edit profile link if user is authenticated and is viewing their own profile
      vm.showEditProfileLink = TcAuthService.isAuthenticated() && UserService.getUserIdentity().handle.toLowerCase() === vm.userHandle.toLowerCase();
      vm.isUser = vm.showEditProfileLink;
      if (profile.createdAt) {
        profile.startMonth = moment(profile.createdAt).format('MMMM, YYYY');
      } else {
        profile.startMonth = null;
      }
      UserService.getV2UserProfile(vm.userHandle).then(function(resp) {
        vm.profile.badges = resp;
      });

    }

    function showBadges() {
      ngDialog.open({
        template: 'profile/badges/badges.html',
        controller: 'BadgesController',
        controllerAs: 'vm',
        className: 'ngdialog-theme-default',
        resolve: {
          userHandle: function() {
            return vm.userHandle;
          },
          profile: function() {
            return vm.profile;
          }
        }
      });
    }

    function closeDialog() {
      ngDialog.close();
    }

    function scrollTo(track) {
      $anchorScroll(track + '_TRACK');
    }
  }

})();
