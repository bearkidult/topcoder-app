(function() {
  'use strict';

  angular.module('tcUIComponents').directive('togglePasswordWithTips', togglePasswordWithTips);

  function togglePasswordWithTips() {
    return {
      restrict: 'E',
      require: '^form',
      templateUrl: 'directives/account/toggle-password-with-tips/toggle-password-with-tips.html',
      link: function(scope, element, attrs, formController) {
        var vm = scope.vm;
        vm.passwordField = formController.password;
        vm.placeholder = vm.defaultPlaceholder;
        vm.password = '';

        var passwordInput = element.children()[0];

        element.bind('click', function(event) {
          passwordInput.focus();
        });

        element.bind('keyup', function(event) {
          if (event.keyCode === 13) {
            passwordInput.blur();
          }
        });

        vm.onFocus = function(event) {
          vm.passwordFocus = true;
          vm.placeholder = '';
          element.addClass('focus');
        }

        vm.onBlur = function(event) {
          var relatedTarget = angular.element(event.relatedTarget);
          element.removeClass('focus');

          // If you are blurring from the password input and clicking the checkbox
          if (relatedTarget.attr('type') === 'checkbox' && relatedTarget.attr('id') === 'passwordCheckbox') {
            vm.passwordFocus = true;
            vm.placeholder = '';
          } else {
            // If you are blurring from the password input and clicking anywhere but the checkbox
            vm.passwordFocus = false;

            if (vm.password === '' || vm.password === undefined) {
              vm.placeholder = vm.defaultPlaceholder;
              formController.password.$setPristine();
            }
          }
        };

        vm.toggleInputType = function() {
          var $passwordInput = angular.element(passwordInput);

          if ($passwordInput.attr('type') === 'text') {
            $passwordInput.attr('type', 'password');
          } else {
            $passwordInput.attr('type', 'text');
          }
        }
      }
    };
  }
})();
