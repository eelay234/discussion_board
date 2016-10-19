console.log('routes');
var topics = require('../controllers/topics.js');
var users = require('../controllers/users.js');
var posts = require('../controllers/posts.js');

// WE NEED TO ADD a few lines of code up here!
// What is this 'friends' object we are referencing below??
module.exports = function(app){
  app.get('/topics', topics.topics);
  app.get('/topics/:id', topics.getTopic);
  app.post('/add_topic', topics.add_topic);
  app.get('/users/:id', users.getUser);
  app.post('/users/login', users.login);
  app.get('/getUsers', users.getUsers);
  app.post('/users', users.registration);
  app.post('/post', posts.add_post);
  app.post('/upvote/:id', posts.upvote);
  app.post('/downvote/:id', posts.downvote);
  app.get('/getPostsById/:id', posts.getPost);
  app.get('/posts/:id', posts.posts);
  app.post('/add_comment/:id', posts.add_comment);
}
// this adds route listeners to friends for 5 of the 7 RESTful routes, excluding new and edit.
