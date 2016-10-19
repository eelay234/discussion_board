app.controller('topicController', ['$scope', '$routeParams', 'topicsFactory', 'postsFactory', 'usersFactory', 'shareUserService', '$http', '$location',
           function($scope, $routeParams, topicsFactory, postsFactory, usersFactory, shareUserService,
               $http, $location ) {
      console.log("topic controller starting...");
      $scope.c = [];
      $scope.user = usersFactory.getUser($routeParams.id);

      topicsFactory.getTopic($routeParams.id,function(data){
        $scope.topic = data;
        $scope.posts = $scope.topic.posts;
      });
      postsFactory.posts($routeParams.id, function(data){
        $scope.posts = data;
      });
      usersFactory.getUsers(function(data){
        $scope.users = data;
      });
      // var posts = function() {
      //     postsFactory.posts(function beingPassedToTheFactoryIndexByThisController(postsFromTheFactory) {
      //       $scope.posts = postsFromTheFactory.posts;
      //     } /* end args passed to userFactor index */ ); //end userFactory method invokation
      // } //end usersIndex
      // posts();
      $scope.post = function(){
              var parameter = {};
              parameter._topic = $routeParams.id;
              parameter.message =  $scope.message;
              parameter._user =  shareUserService.getUser()._id;
              //parameter.name = shareUserService.getUser().first_name;
              postsFactory.post(parameter, function passedToFriendsFactoryCreate(postsFromFactory){
                if (postsFromFactory.err) {
                   $scope.errorMessage_post = postsFromFactory.err;
                }
                else {
                  console.log("I am post");
                  topicsFactory.getTopic($routeParams.id,function(data){
                    $scope.topic = data;
                    $scope.posts = $scope.topic.posts;
                  });
                  postsFactory.posts($routeParams.id, function(data){
                    $scope.posts = data;
                  });
                   $scope.message = "";
                  // usersFactory.getUsers(function(data){
                  //   $scope.users = data;
                  // });
                }
              });

          }
    $scope.upvote = function(id){
            postsFactory.upvote(id, function(res){
              //posts();
              topicsFactory.getTopic($routeParams.id,function(data){
                $scope.topic = data;
                $scope.posts = $scope.topic.posts;
              });
              postsFactory.posts($routeParams.id, function(data){
                $scope.posts = data;
              });
            });
        }
    $scope.downvote = function(id){
            postsFactory.downvote(id, function(res){
              //posts();
              topicsFactory.getTopic($routeParams.id,function(data){
                $scope.topic = data;
                $scope.posts = $scope.topic.posts;
              });
              postsFactory.posts($routeParams.id, function(data){
                $scope.posts = data;
              });
            });
        }
     $scope.add_comment = function(id){
         var parameter = {};
         //console.log(document.getElementById("c").value);
         parameter.text =  $scope.c[id]; //document.getElementById("c").value; //document.getElementById("c").value; //document.getElementById(id).value; //$scope.comment;
         parameter.name = shareUserService.getUser().first_name+","+shareUserService.getUser().last_name;
         parameter._post = id;
         parameter._user = shareUserService.getUser()._id;
         parameter.created_at = Date.now;
         postsFactory.add_comment(parameter, id, function passedToPostsFactoryUpdate(postsFromFactory){
             if (postsFromFactory.err) {
                $scope.errorMessage_post = postsFromFactory.err;
             }
             else {
               topicsFactory.getTopic($routeParams.id,function(data){
                 $scope.topic = data;
                 $scope.posts = $scope.topic.posts;
               });
               postsFactory.posts($routeParams.id, function(data){
                 $scope.posts = data;
               });
               $scope.c[id] =  "";
               usersFactory.getUsers(function(data){
                 $scope.users = data;
               });
             }
       });
    }

}])
