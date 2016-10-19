var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var TopicSchema = new mongoose.Schema({
 _user: {type: Schema.Types.ObjectId, ref: 'User'},
 name: {type: String },
 title: { type: String, required: true, minlength: 3 },
 category: { type: String },
 description: { type: String, required: true, minlength: 6 },
 created_at: { type: Date, required: true, default: Date.now },
 posts: [{type: Schema.Types.ObjectId, ref: 'Post'}]
}, { timestamps: true });
// The 'type' property of the object inside of the array is an attribute
// that tells Mongoose what to look for.
mongoose.model('Topic', TopicSchema);
