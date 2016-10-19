//var bcrypt = require('bcrypt');
//var bcrypt = require('bcrypt-nodejs')
var bcrypt = require('bcryptjs');

console.log('users controller');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
module.exports = {
  login: function(req, res) {
    console.log("ZXXXXXXX");
    errorMessage = "";
    console.log("YYYYY: "+req.body.email);
    if (!req.body.email)
      errorMessage += "please enter email!\n";
      if (req.body.email && !validateEmail(req.body.email))
          errorMessage += "invalid email format!\n";
    if (!req.body.password)
        errorMessage += "please enter password!\n";
    if (errorMessage)
        return res.json({err: errorMessage});
    User.findOne({email: req.body.email}, function(err, user) {
      console.log("TTT"+ (user== null));
      if(user == null) {
        console.log('ERROR: '+err);
        res.json({err: "email not existing..."});
      } else {
        console.log("^^^^^^^");
        if (req.body.password && bcrypt.compareSync(req.body.password, user.password)) {
          console.log('successfully find user!');
          res.json(user);
        }
        else{
          if (!req.body.password)
            res.json({err: err});
          else
            res.json({err: "password not matched!"});
        }
      }
    })
  },
    registration: function(req, res) {
      console.log("UUUU: "+req.body.password);
      errorMessage  = "";
      if (req.body.password && req.body.password != req.body.confirm_password){
        errorMessage += "password and confirm password not matched!\n";
      }
      if (req.body.password)
        req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
      var user = new User({ first_name: req.body.first_name, last_name: req.body.last_name,
          email: req.body.email, password: req.body.password, birthday: req.body.birthday });
      user.save(function (err) {
            if (err) {
              //console.log("####: "+err.errors.email.message);
              if (err.errors.first_name)
                errorMessage += err.errors.first_name.message+"\n";
              if (err.errors.last_name)
                  errorMessage += err.errors.last_name.message+"\n";
              if (err.errors.email)
                errorMessage += err.errors.email.message+"\n";
              if (err.errors.password)
                  errorMessage += err.errors.password.message+"\n";
              if (err.errors.birthday)
                    errorMessage += err.errors.birthday.message+"\n";
              return res.json({err: errorMessage});
            }
            if (errorMessage)
              return res.json({err: errorMessage});
            return res.send(user);
      });
    },
    getUser: function(req, res) {
      console.log("TTTTLLLLLL"+req.params.id);
      User.findOne({_id: req.params.id}, function(err, user) {
        console.log("TTTT"+user);
        if(err) {
          console.log('ERROR: '+err);
          res.json("error"+err);
        } else {
          res.json(user);
        }
      })
    },
    getUsers: function(req, res) {
      User.find({}, function(err, users) {
        console.log("TTTT"+users);
        if(err) {
          console.log('ERROR: '+err);
          res.json("error"+err);
        } else {
          res.json(users);
        }
      })
    }
}
