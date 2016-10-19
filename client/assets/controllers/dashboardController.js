app.controller('dashboardController', ['$scope', 'usersFactory', 'shareUserService', '$rootScope', 'topicsFactory', '$location', function($scope,
  usersFactory, shareUserService, $rootScope, topicsFactory, $location) {
      /* Private Methods */
      /* on load time */
    //   var getCategories = function() {
    //       topicsFactory.getCategories(function beingPassedToTheFactoryIndexByThisController(categoriesFromTheFactory) {
    //         $scope.categories = categoriesFromTheFactory;
    //         console.log("here "+$scope.categories);
    //       } /* end args passed to userFactor index */ ); //end userFactory method invokation
    //     }
    //  $scope.new_topic.category = {
    //    "type": "select",
    //    "name": "Service",
    //    "value": "Service 3",
    //    "values": [ "HTML", "Java", "C/C++", "Ruby", "Python"]
    //  };
    //   $scope.categories = ['HTML', 'java', 'C/C++'];
      var getUsers =  function() {
        usersFactory.getUsers(function(res){
          $scope.users = res.data;
        })
      }
      getUsers();
      $scope.getTopic = function(id) {
          topicsFactory.getTopic(id, function (topicFromTheFactory) {
            $scope.topic = topicFromTheFactory;
            $location.url("/topic");
          } /* end args passed to userFactor index */ ); //end userFactory method invokation
      } //end usersIndex
      var getUser = function(id) {
        console.log("KKKKKKK:"+id);
        usersFactory.getUser(id, function(returnedData){
          $scope.user = returnedData.data;
          $location.url("/user");
        });
      }
      
      var getTopics = function() {
          topicsFactory.getTopics(function beingPassedToTheFactoryIndexByThisController(topicsFromTheFactory) {
            $scope.topics = topicsFromTheFactory.data;
            //$scope.login_user = $rootScope.user.first_name;
            $scope.login_user=shareUserService.getUser();
          } /* end args passed to userFactor index */ ); //end userFactory method invokation
        } //end usersIndex

      /* Scope Methods */
      $scope.add_topic = function(){
              //var user = shareUserService.getUser();
              console.log("OOOO:"+$scope.login_user.first_name);
              var topic = {
                title: $scope.new_topic.title,
                description: $scope.new_topic.description,
                category: $scope.new_topic.category,
                _user: $scope.login_user._id
              }
              topicsFactory.add_topic(topic, function(response){
                if(response === 'success'){
                  getTopics();
                }
              });
          }
      //   /* on load time */
      console.log("loading the controller");
      console.log(topicsFactory);
      console.log(this);
      getTopics();

}]);
