const mongoose = require('mongoose')
const Schema = mongoose.Schema


var answerSchema = new Schema({
  creator: { type: Schema.Types.ObjectId, ref: 'User' },
  question: { type: Schema.Types.ObjectId, ref: 'Question' },
  title: String,
  description: String,
  code: String,
  date_created: Date,
  upvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  downvotes: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

const Answer = mongoose.model('Answer', answerSchema);

module.exports = Answer