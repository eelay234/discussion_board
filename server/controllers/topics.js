console.log('topics controller');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Post = mongoose.model('Post');
var Topic = mongoose.model('Topic');
module.exports = {
    topics: function(req, res) {
      Topic.find({}).populate('_user', 'first_name'+' '+'last_name')
          .populate({ path: 'posts',
              populate: { path: '_user',
                          select: 'first_name'+' '+'last_name'}
          })
          .exec(function(err, topics){
             if(err){
                  res.json("error");
             }
            else{
              res.json(topics);
            }
         });
    },
    getTopic: function(req, res) {
      Topic.findOne({_id: req.params.id}).populate('_user', 'first_name'+' '+'last_name')
          .populate({ path: 'posts',
              populate: { path: '_user',
                          select: 'first_name'+' '+'last_name'}
          })
          .exec(function(err, topic){
             if(err){
                  res.json("error");
             }
            else{
              res.json(topic);
            }
         });
    },
    add_topic: function(req, res) {
          console.log("POST topic", req.body);
          User.findOne({_id: req.body._user}, function(err, user){

            var topic = new Topic({
              title: req.body.title,
              description: req.body.description,
              category: req.body.category,
              _user: req.body._user,
              name: user.first_name + ","+user.last_name,
              posts: []
            });

            topic.save(function(err){
              if(err){
                res.json("error");
              }
              else{
                user.topics.push(topic);
                user.save();
                console.log('successfully added a topic!');
                res.json("success" );
              }
            });
          });
        },

    }
