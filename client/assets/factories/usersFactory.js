console.log('users Factory');
app.factory('usersFactory', ['$http', function($http) {
  // constructor for our factory
  var user = {};
  function usersFactory(){
    var _this = this;
    this.getUser = function(id,callback){
      $http.get('/users/'+id).then(function(returned_data){
        console.log("&&&&^^^"+returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    }
    this.getUsers = function(callback){
      $http.get('getUsers').then(function(returned_data){
        console.log("&&&&"+returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    }
    this.registration = function(req,callback){
      console.log("cccc:"+req.last_name);
      $http.post('/users', req).then(function(returned_data){
        console.log("&&&&"+returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };
    this.login = function(req, callback){// what parameters do we need?
        // Your code here
        console.log("usersFactory show:"+req.email);
        $http.post('/users/login', req).then(function(returned_data){
          console.log("return from http get:"+returned_data.data);
          user = returned_data.data;
          callback(user);
        });
    };

    }
  return new usersFactory();
}]);
