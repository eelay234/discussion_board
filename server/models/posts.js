var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var PostSchema = new mongoose.Schema({
 _topic: {type: Schema.Types.ObjectId, ref: 'Topic'},
 _user: {type: Schema.Types.ObjectId, ref: 'User'},
 name: {type: String },
 message: { type: String, required: true, minlength: 6 },
 upvote: { type: Number },
 downvote: { type: Number },
 created_at: { type: Date, required: true, default: Date.now },
 comments: [{type: Schema.Types.ObjectId, ref: 'Comment'}]
}, { timestamps: true });
// The 'type' property of the object inside of the array is an attribute
// that tells Mongoose what to look for.
mongoose.model('Post', PostSchema);
