'use strict';

angular.module('cesiApp')
  .controller('LoginCtrl', function ($scope, Auth, $location, toastr) {
    $scope.user = {};
    $scope.errors = {};

    $scope.login = function (form) {
      $scope.submitted = true;

      if (form.$valid) {
        Auth.login({
            username: $scope.user.username,
            password: $scope.user.password
          })
          .then(function () {
            // Logged in, redirect to home
            $location.path('/');
          })
          .catch(function (err) {
            toastr.error(err.message);
            $scope.errors.other = err.message;
          });
      }
    };

  });
