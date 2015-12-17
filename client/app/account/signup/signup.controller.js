'use strict';

angular.module('cesiApp')
  .controller('SignupCtrl', function ($scope, Auth, $location, Upload) {
    $scope.user = {};
    $scope.errors = {};

    $scope.register = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        $scope.user.avatar.upload = Upload.upload({
          url: '/api/users',
          data: {
            username: $scope.user.username.toLowerCase(),
            password: $scope.user.password,
            urlPhoto: $scope.user.urlPhoto,
            avatar: $scope.user.avatar
          },
        });
        $scope.user.avatar.upload.then(function () {
            // Account created, redirect to home
            $location.path('/');
          }, function (response) {
            if (response.status > 0) {
              $scope.errorMsg = response.status + ': ' + response.data;
            }
          }, function (evt) {
            // Math.min is to fix IE which reports 200% sometimes
            $scope.user.avatar.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
          })
          .catch(function (err) {
            err = err.data || [];
            $scope.errors = {};

            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function (error, field) {
              form[field].$setValidity('mongoose', false);
              $scope.errors[field] = error.message;
            });
          });
      }
    };

  }).directive('file', function () {
  return {
    scope: {
      file: '='
    },
    link: function (scope, el) {
      el.bind('change', function (event) {
        var files = event.target.files;
        var file = files[0];
        scope.file = file ? file.name : undefined;
        scope.$apply();
      });
    }
  };
});
