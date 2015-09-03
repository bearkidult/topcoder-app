(function () {

  angular
    .module('tc.profile')
    .controller('ProfileSubtrackController', ProfileSubtrackController);

  ProfileSubtrackController.$inject = ['$scope', 'ProfileService', '$q', '$stateParams', 'ChallengeService', 'CONSTANTS', '$state', '$window'];

  function ProfileSubtrackController($scope, ProfileService, $q, $stateParams, ChallengeService, CONSTANTS, $state, $window) {
    var vm = this;
    vm.subTrack = decodeURIComponent($stateParams.subTrack || '') || '';
    vm.track = $stateParams.track;
    vm.viewing = 'challenges';
    vm.domain = CONSTANTS.domain;
    vm.challenges = [];
    var profileVm = $scope.$parent.profileVm;
    vm.dropdown = [];
    vm.ddSelected = {};
    vm.distribution = {};
    vm.selectSubTrack = selectSubTrack;
    vm.back = back;
    vm.status = {
      'challenges': CONSTANTS.STATE_LOADING
    };
    // paging params, these are updated by tc-pager
    vm.pageParams = {
      offset : 0,
      limit: 5,
      count: 0,
      totalCount: 0,
      // counter used to indicate page change
      updated: 0
    };

    activate();

    function activate() {
      vm.distributionPromise = ProfileService.getDistributionStats(vm.track, vm.subTrack);
      vm.distributionPromise.then(function(data) {
        vm.distribution = data.distribution;
      });
      profileVm.statsPromise.then(function(data) {
        vm.typeStats = ProfileService.getChallengeTypeStats(
          profileVm.stats,
          vm.track,
          vm.subTrack.toLowerCase().replace(/ /g, '')
        );
        if (vm.subTrack) {
          vm.dropdown = ProfileService.getSubTracks(profileVm.stats, vm.track.toLowerCase())
          .map(function(subtrack) {
            return {
              text: vm.track + ': ' + subtrack,
              value: subtrack
            };
          });
          vm.ddSelected = vm.dropdown.filter(function(selection) {
            return selection.value === vm.subTrack;
          })[0];
        } else {
          vm.ddSelected =  {
            text: 'Co-Pilot',
            value: 'Co-Pilot'
          };
        }

      });

      // watches page change counter to reload the data
      $scope.$watch('vm.pageParams.updated', function(updatedParams) {
        _getChallenges();
      });
      _getChallenges();
    }

    function selectSubTrack(subTrack) {
      $state.go('profile.subtrack', {track: vm.track, subTrack: subTrack});
    }

    function back() {
      $window.history.back();
    }

    function _getChallenges() {
      vm.status.challenges = CONSTANTS.STATE_LOADING;
      return ChallengeService.getUserChallenges(
        profileVm.profile.handle,
        {
          filter: {
            status: 'completed',
            track: vm.track,
            subTrack: vm.subTrack
          },
          limit: vm.pageParams.limit,
          offset: vm.pageParams.offset,
          orderBy: 'submissionEndDate desc'
        }
      )
      .then(function(data) {
        vm.challenges = data;
        vm.status.challenges = CONSTANTS.STATE_READY;
        return data;
      }).catch(function(err) {
        vm.status.challenges = CONSTANTS.STATE_ERROR;
      });
    }

  }


})();
