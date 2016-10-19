app.controller('loginController', ['$scope', '$rootScope', 'usersFactory', 'shareUserService', '$http', '$location',
           function($scope, $rootScope, usersFactory, shareUserService,
               $http, $location ) {
       console.log("Log in controller starting...");
       $scope.user = {}
       $scope.user_login = {}
       $scope.user.activity = "";
       $scope.errorMessage_login = false;
       $scope.errorMessage_registration = false;
       $scope.login = function() {
                     usersFactory.login($scope.user_login, function(returned_data){
                       if (returned_data.err) {
                          $scope.errorMessage_registration = false;
                         $scope.errorMessage_login = returned_data.err;
                         $location.url("/");
                       }
                       else {
                         $scope.user_login = returned_data;
                         $scope.user_login.birthday = new Date($scope.user_login.birthday);
                         $scope.user_login.activity = "login";
                         $rootScope.user = $scope.user_login;
                         shareUserService.putUser($scope.user_login);
                         console.log("log in return  "+$rootScope.user.first_name);
                         $location.url('/dashboard');
                       }
                     });
                   }
        $scope.registration = function(){
                usersFactory.registration($scope.user, function passedToUsersFactoryCreate(userFromFactory){
                  if (userFromFactory.err) {
                     $scope.errorMessage_login = false;
                     $scope.errorMessage_registration = userFromFactory.err;
                     $location.url("/");
                  }
                  else {
                    $scope.user_login = userFromFactory
                    ;
                    $scope.user = userFromFactory;
                    $scope.user.activity = "registration";
                    shareUserService.putUser($scope.user);
                    $rootScope.user = $scope.user;
                    $location.url("/dashboard");
                  }
                });
            }
        $scope.logout = function(){
          $scope.user =  false;
          $scope.user_login = false;
          shareUserService.putUser({});
          $rootScope.user =  false;
          $scope.activity = "";
          $scope.errorMessage_login = false;
          $scope.errorMessage_registration = false;
          console.log("logout rootscope user  = "+$rootScope.user);
        }
}]);
