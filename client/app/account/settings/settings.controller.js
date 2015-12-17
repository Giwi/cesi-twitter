'use strict';

angular.module('cesiApp')
  .controller('SettingsCtrl', function ($scope, User, Auth, toastr, Upload, $timeout, $window) {
    $scope.errors = {};
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.$watch('avatar', function () {
      if (!!$scope.avatar) {
        $scope.uploadPic($scope.avatar);
      }
    });
    $scope.uploadPic = function (file) {
      file.upload = Upload.upload({
        url: '/api/users/' + $scope.getCurrentUser()._id + '/update',
        data: {avatar: file}
      });

      file.upload.then(function (response) {
        $timeout(function () {
          file.result = response.data;
          $window.location.reload();
        });
      }, function (response) {
        if (response.status > 0) {
          $scope.errorMsg = response.status + ': ' + response.data;
        }
      }, function (evt) {
        // Math.min is to fix IE which reports 200% sometimes
        file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
    };
    $scope.changePassword = function (form) {
      $scope.submitted = true;
      if (form.$valid) {
        Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword, angular.noop)
          .then(function () {
            toastr.success('Success', 'Password successfully changed');
          })
          .catch(function () {
            form.password.$setValidity('mongoose', false);
            toastr.error('Error', 'Incorrect password');
            $scope.message = '';
          });
      }
    };
  });
