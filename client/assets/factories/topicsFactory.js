console.log('topicss Factory');
app.factory('topicsFactory', ['$http', function($http) {
  // constructor for our facto
  function topicsFactory(){
    var _this = this;
    this.getTopic = function(id, callback){
      $http.get('/topics/'+id).then(function(returned_data){
        console.log("&&&&"+returned_data.data);
        if (typeof(callback) == 'function'){
          callback(returned_data.data);
        }
      });
    };
    this.add_topic = function(req, callback){ // what parameters do we need                      date: req.created_date});
      $http.post('/add_topic/', req).then(function(returned_data){
        console.log("return from http add topic:"+returned_data.data);
        callback(returned_data.data);
      });
    };
    this.getTopics = function(callback){
      //call this method if you want to update or set the friends variable
      $http.get('/topics').then(function(returned_data){
        callback(returned_data);
      });
 //Note: this can be shortened to $http.get('/friends').then(callback);
 //But only if you only want to run the callback from the controller.
    };

  }
  console.log(new topicsFactory());
  return new topicsFactory();
}]);
