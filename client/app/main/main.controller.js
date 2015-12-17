'use strict';

angular.module('cesiApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.messages = [];
    $scope.currentPage = 1;
    $scope.begin = 0;
    $scope.mess = { };
    $http.get('/api/messages').success(function(messages) {
      $scope.messages = messages;
      socket.syncUpdates('messages', $scope.messages);
    });
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.addMessage = function() {
      if( $scope.mess.message === '') {
        return;
      }
      $http.post('/api/messages',  angular.copy($scope.mess));
      $scope.mess.message = '';
    };

    $scope.pageChanged = function() {
      $scope.begin = ($scope.currentPage-1) * 10;
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('messages');
    });
  });
