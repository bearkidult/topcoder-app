(function() {
  'use strict';
  angular.module('tcUIComponents').directive('tcTransclude', function() {
    return {
      link: function($scope, $element, $attrs, controller, $transclude) {
        if (!$transclude) {
          throw minErr('ngTransclude')('orphan',
           'Illegal use of ngTransclude directive in the template! ' +
           'No parent directive that requires a transclusion found. ' +
           'Element: {0}',
           startingTag($element));
        }
        var innerScope = $scope.$new();
        $transclude(innerScope, function(clone) {
          $element.empty();
          $element.append(clone);
          $element.on('$destroy', function() {
            innerScope.$destroy();
          });
        });
      }
    };
  });
})();