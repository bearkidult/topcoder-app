(function() {
  'use strict';
  var _supportedAccounts = [
    { provider: "dribbble", className: "fa-dribbble", displayName: "Dribbble", disabled: false, order: 6, colorClass: 'el-dribble'},
    { provider: "linkedin", className: "fa-linkedin", displayName: "LinkedIn", disabled: true, order: 5, colorClass: 'el-linkedin'},
    { provider: "stackoverflow", className: "fa-stack-overflow", displayName: "Stack Overflow", disabled: false, order: 3, colorClass: 'el-stackoverflow'},
    { provider: "behance", className: "fa-behance", displayName: "Behance", disabled: true, order: 2, colorClass: 'el-behance'},
    // { provider: "google-oauth2", className: "fa-google-plus", displayName: "Google+", disabled: true, order: }, colorClass: 'el-dribble',
    { provider: "github", className: "fa-github", displayName: "Github", disabled: false, order: 1, colorClass: 'el-github'},
    { provider: "bitbucket", className: "fa-bitbucket", displayName: "Bitbucket", disabled: true, order: 7, colorClass: 'el-bitbucket'},
    { provider: "twitter", className: "fa-twitter", displayName: "Twitter", disabled: true, order: 4, colorClass: 'el-twitter'},
    { provider: "weblinks", className: "fa-globe", displayName: "Web Links", disabled: true, order: 8, colorClass: 'el-weblinks'}
    // TODO  add more
  ];

  angular.module('tcUIComponents')
  .directive('externalAccounts', function() {
    return {
      restrict: 'E',
      templateUrl: 'directives/external-account/external-account.directive.html',
      scope: {
        linkedAccounts: '=',
        readOnly: '='
      },
      controller: ['$log', '$scope', 'ExternalAccountService', 'toaster',
        function($log, $scope, ExternalAccountService, toaster) {
          $log = $log.getInstance("ExtAccountDirectiveCtrl")
          $scope.accountList = _.clone(_supportedAccounts, true);
          $scope.$watchCollection('linkedAccounts', function(newValue, oldValue) {
            for (var i=0;i<$scope.accountList.length;i++) {
              $scope.accountList[i].linked = !!_.find(newValue, function(a) {
                return $scope.accountList[i].provider === a.providerType;
              });
            }
          });

          $scope.handleClick = function(provider, unlink) {
            var provider = _.find(_supportedAccounts, function(s) {
              return s.provider === provider;
            });
            if (unlink) {
              $log.debug(String.supplant('UnLinking to ' + provider.displayName));
              _unlink(provider);
            } else {
              $log.debug(String.supplant('Linking to ' + provider.displayName));
              _link(provider);
            }
          };

          function _link(provider) {
            ExternalAccountService.linkExternalAccount(provider.provider, null)
            .then(function(resp) {
              $log.debug("Social account linked: " + JSON.stringify(resp));
              $scope.linkedAccounts.push(resp.profile);
              toaster.pop('success', "Success",
                String.supplant(
                  "Your {provider} account has been linked. Data from your linked account will be visible on your profile shortly.",
                  {provider: provider.displayName}
                )
              );
            })
            .catch(function(resp) {
              if (resp.status === 'SOCIAL_PROFILE_ALREADY_EXISTS') {
                $log.info("Social profile already linked to another account");
                toaster.pop('error', "Whoops!",
                  String.supplant(
                    "This {provider} account is linked to another account. \
                    If you think this is an error please contact <a href=\"mailTo:support@.appirio.com\">support@apprio.com</a>.",
                    {provider: provider.displayName }
                  )
                );
              }
            });
          }

          function _unlink(provider) {
            return ExternalAccountService.unlinkExternalAccount(provider.provider)
            .then(function(resp) {
              $log.debug("Social account unlinked: " + JSON.stringify(resp));
              var toRemove = _.findIndex($scope.linkedAccounts, function(la) {
                return la.providerType === provider;
              });
              $scope.linkedAccounts.splice(toRemove, 1);
              toaster.pop('success', "Success",
                String.supplant(
                  "Your {provider} account has been unlinked.",
                  {provider: provider.displayName}
                )
              );
            })
            .catch(function(resp) {
              var msg = resp.msg;
              if (resp.status === 'SOCIAL_PROFILE_NOT_EXIST') {
                $log.info("Social profile not linked to account");
                msg = "{provider} account is not linked to your account. If you think this is an error please contact <a href=\"mailTo:support@.appirio.com\">support@apprio.com</a>.";
              } else {
                $log.info("Fatal error: " + msg);
                msg = "Sorry! We are unable to unlink your {provider} account. If problem persists, please contact <a href=\"mailTo:support@.appirio.com\">support@apprio.com</a>";
              }
              toaster.pop('error', "Whoops!", String.supplant(msg, {provider: provider.displayName }));
            });
          }
        }
      ]
    };
  })
  .directive('externalLinksData', function() {
    return {
     restrict: 'E',
      templateUrl: 'directives/external-account/external-link-data.directive.html',
      scope: {
        linkedAccountsData: '=',
        externalLinks: '='
      },
      controller: ['$log', '$scope', 'ExternalAccountService',
        function($log, $scope, ExternalAccountService) {
          $log = $log.getInstance('ExternalLinksDataDirective');

          $scope.$watch('linkedAccountsData', function(newValue, oldValue) {
            var linkedAccounts = [];
            for (var i=0;i<_supportedAccounts.length;i++) {
              var n = _supportedAccounts[i],
                extObj = _.get(newValue, n.provider, null);
              if (extObj) {
                linkedAccounts.push({
                  provider: n.provider,
                  data: extObj
                });
              }
            }
            $scope.linkedAccounts = linkedAccounts;
          });

          $scope.$watchCollection('externalLinks', function(newValue, oldValue) {
            angular.forEach(newValue, function(link) {
              var provider = link.providerType;

              if (!$scope.linkedAccountsData[provider]) {
                $scope.linkedAccounts.push({
                  provider: provider,
                  data: {
                    handle: link.name,
                    status: 'PENDING'
                  }
                });
              }
            });
          });
        }
      ]
    }
  })
  .filter('providerData', function() {
    return function(input, field) {
      return _.result(_.find(_supportedAccounts, function(s) {
        return s.provider === input.provider;
      }), field) || "";
    };
  });
})();
