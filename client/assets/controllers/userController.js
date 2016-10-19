app.controller('userController', ['$scope', '$routeParams', 'topicsFactory', 'postsFactory', 'usersFactory', 'shareUserService', '$http', '$location',
           function($scope, $routeParams, topicsFactory, postsFactory, usersFactory, shareUserService,
               $http, $location ) {
      console.log("user controller starting...");
      usersFactory.getUser($routeParams.id,function(data){
        console.log("BBBBBBBBB"+data);
        $scope.user = data;
      });
      //$scope.user = usersFactory.getUser($routeParams.id);
      // $window.location.href = 'partials/user.html';

  }])
