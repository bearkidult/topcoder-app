(function () {
  'use strict';

  angular.module('tc.myDashboard').controller('MyChallengesWidgetController', MyChallengesWidgetController);

  MyChallengesWidgetController.$inject = ['ChallengeService', 'UserService', '$q', '$log', 'CONSTANTS', 'Helpers'];

  function MyChallengesWidgetController(ChallengeService, UserService, $q, $log, CONSTANTS, Helpers) {
    var vm = this;
    vm.domain = CONSTANTS.domain;
    vm.loading = true;
    vm.myChallenges = [];
    vm.userHasChallenges = true;

    var handle = UserService.getUserIdentity().handle;

    activate();

    function activate() {
      viewActiveChallenges();
    }

    function viewActiveChallenges() {
      vm.myChallenges = [];
      getChallenges('active', 'submissionEndDate');
    }

    // get ACTIVE challenges and spotlight challenges
    function getChallenges(status, orderBy) {
      var params = {
        limit: 6,
        offset: 0,
        orderBy: orderBy, // TODO verify if this is the correct sort order clause,
        filter: {
          status : status
        }
      };

      $q.all([
        ChallengeService.getUserChallenges(handle, params),
        ChallengeService.getSpotlightChallenges()
      ])
      .then(function(data){
        var challenges = data[0];
        var spotlightChallenges = data[1];

        if (challenges.length > 0) {
          // FIXME until we figure out the correct sort order param

          vm.myChallenges = challenges;
          vm.spotlightChallenge = spotlightChallenges[0];

          vm.userHasChallenges = true;
          vm.loading = false;
        } else {
          vm.userHasChallenges = false;
          vm.spotlightChallenges = spotlightChallenges.slice(0, 2);
          vm.loading = false;
        }
      })
      .catch(function(err) {
        $log.error(err);
        vm.userHasChallenges = true;
        vm.loading = false;
        // TODO - handle error
      });
    }
  }
})();
