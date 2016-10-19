var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var CommentSchema = new mongoose.Schema({
 // since this is a reference to a different document, the _ is the naming convention!
 _post: {type: Schema.Types.ObjectId, ref: 'Post'},
 _user: {type: Schema.Types.ObjectId, ref: 'User'},
 name: {type: String },
 text: { type: String, required: true, minlength: 6 },
 created_at: { type: Date, required: true, default: Date.now }
}, {timestamps: true });
mongoose.model('Comment', CommentSchema);
