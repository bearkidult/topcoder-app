(function() {
  'use strict';

  angular.module('tcUIComponents').directive('focusOn', focusOn);

  focusOn.$inject = ['$timeout', '$parse'];

  function focusOn($timeout, $parse) {
    return function(scope, element, attr) {
      var model = $parse(attr.focusOn);
      scope.$watch(model, function(newValue) {
        $timeout(function() {
          if (newValue !== undefined) {
            element[0].focus();
          }
        }, 0);
      });
    };
  }
})();
