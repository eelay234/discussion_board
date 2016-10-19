console.log('Posts Factory');
app.factory('postsFactory', ['$http', function($http) {
  // constructor for our factory
  var posts = [];
  var post = {};
  function PostsFactory(){
    var _this = this;
    this.post = function(req,callback){
      $http.post('/post', req).then(function(returned_data){
        console.log("&&&&"+returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };
    this.upvote = function(id,callback){
      $http.post('/upvote/'+id).then(function(returned_data){
        console.log("&&&&"+returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };
    this.downvote = function(id,callback){
      $http.post('/downvote/'+id).then(function(returned_data){
        console.log("&&&&"+returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };
    this.add_comment = function(req, id, callback){ // what parameters do we need?
      // Your code here
      // console.log("PostsFactorysFactory add comment:"+id);
      // // console.log(friends[0]);
      // // id = this.getFriend(idx)._id;
      // var parameter = JSON.stringify({name: req.name, text:req.text,
      //                             date: req.created_date});
      $http.post('/add_comment/'+id, req).then(function(returned_data){
        console.log("return from http get:"+returned_data.data);
        var posts = returned_data.data;
        callback(posts);
      });
    };
    this.posts = function(id, callback){
      //call this method if you want to update or set the friends variable
      $http.get('/posts/'+id).then(function(returned_data){
        console.log("return from http get in this.posts:"+returned_data.data);
        var posts = returned_data.data;
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
 //Note: this can be shortened to $http.get('/friends').then(callback);
 //But only if you only want to run the callback from the controller.
    };

  }
  console.log(new PostsFactory());
  return new PostsFactory();
}]);
