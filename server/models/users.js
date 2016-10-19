console.log('users model');
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
require('mongoose-type-email');
var uniqueValidator = require('mongoose-unique-validator');
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};
var UserSchema = new mongoose.Schema({
   first_name:  { type: String, required: true, minlength: 3},
   last_name:  { type: String, required: true, minlength: 3},
   email: {
     type: mongoose.SchemaTypes.Email, required: true,
      //  type: String,
      //  trim: true,
      //  lowercase: true,
      unique: true,
      //  required: 'Email address is required',
      //  validate: [validateEmail, 'Please fill a valid email address'],
      //  match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
   },
   password: {
      type: String, required: true, bcrypt: true
   },
   birthday: { type: Date, required: true, default: Date.now },
   topics: [{type: Schema.Types.ObjectId, ref: 'Topic'}],
   posts: [{type: Schema.Types.ObjectId, ref: 'Post'}],
   comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}],
   created_date: { type: Date, default: Date.now }
 }, {timestamps: true });
UserSchema.plugin(uniqueValidator);
var User = mongoose.model('User', UserSchema); // We are setting this Schema in our Models as 'Friend'
