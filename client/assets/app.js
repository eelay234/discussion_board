var app = angular.module("app", ["ngRoute"]);

app.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', {
    templateUrl: 'partials/login_registration.html',
    controller: "loginController"
  })
  .when('/dashboard', {
    templateUrl: 'partials/dashboard.html',
    controller: "dashboardController"
  })
  .when('/topic/:id', {
    templateUrl: 'partials/topic.html',
    controller: "topicController"
  })
  .when('/user/:id', {
    templateUrl: 'partials/user.html',
    controller: "userController"
  })
  .when('/logout', {
    templateUrl: 'partials/login_registration.html',
    controller: "loginController"
  });
});
