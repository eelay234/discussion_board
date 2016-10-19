console.log('posts controller');
var mongoose = require('mongoose');
var Post = mongoose.model('Post');
var Comment = mongoose.model('Comment');
var User = mongoose.model('User');
var Topic = mongoose.model('Topic');
module.exports = {
  posts: function(req, res) {
    Post.find({_topic: req.params.id}).populate('_user', 'first_name')
        .populate({ path: 'comments',
            populate: { path: '_user',
                        select: 'first_name'}
        })
        .exec(function(err, posts){
           if(err){
                res.json("error");
           }
          else{
            res.json(posts);
          }
       });
  },
  getPost: function(req, res) {
    Post.findOne({_id: req.params.id}).populate('_user', 'name')
        .populate({ path: 'comments',
            populate: { path: '_user',
                        select: 'name'}
        })
        .exec(function(err, post){
           if(err){
                res.json("error");
           }
          else{
            res.json(post);
          }
       });
  },
  add_post: function(req, res) {
        console.log("POST topic", req.body);
        User.findOne({_id: req.body._user}, function(err, user){
          Topic.findOne({_id: req.body._topic}, function(err, topic){

          var post = new Post({
            message: req.body.message,
            upvote: 0,
            downvote: 0,
            name: user.first_name + ","+user.last_name,
            _user: user.id,
            _topic: req.body._topic,
            comments: []
          });

          post.save(function(err){
            if(err){
              res.json("error");
            }
            else{
              user.posts.push(post);
              user.save();
              topic.posts.push(post);
              topic.save();
              console.log('successfully added a post!');
              res.json("success");
            }
          });
        });
      });
    },
    upvote: function(req, res) {
      Post.findOne({_id: req.params.id}, function(err, post){
        if (err) {
           console.log('something went wrong with upvote');
            return res.json("error");
        }
        else {
          var upvote = post.upvote;
          upvote += 1;
          post.upvote = upvote;
          post.save();
           return res.json("success");
      }
    })
  },
    downvote: function(req, res) {
      Post.findOne({_id: req.params.id}, function(err, post){
        if (err) {
           console.log('something went wrong with downvote');
            return res.json("error");
        }
        else {
          var downvote = post.downvote;
          downvote += 1;
          post.downvote = downvote;
          post.save();
           return res.json("success");
      }
     })
   },
    add_comment: function(req, res) {
      User.findOne({_id: req.body._user}, function(err, user){
        Post.findOne({_id: req.body._post}, function(err, post){
          console.log("PPPPPPPPPP"+req.body._user+"<"+req.body._post);
          var comment = new Comment({
            text: req.body.text,
            name: user.first_name + ","+user.last_name,
            _user: req.body._user,
            _post: req.body._post
          });

          comment.save(function(err){
            if(err){
              res.json("error");
            }
            else {
              user.comments.push(comment);
              user.save();
              post.comments.push(comment);
              post.save();
              res.json("success");
            }
          });
        });
      });
    }
}
