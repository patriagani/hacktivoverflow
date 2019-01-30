const mongoose = require('mongoose')
const Schema = mongoose.Schema


var questionSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  title: String,
  description: String,
  code: String,
  date_created: Date,
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  answers: [{ type: Schema.Types.ObjectId, ref: 'Answer' }]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question