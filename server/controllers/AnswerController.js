const Answer = require('../models/Answer')

class AnswerController {

  static getAnswers(req, res) {
    Answer.find()
      .then(function(answers) {
        res.status(200).json(answers)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static createAnswer(req, res) {
    let obj = {
      creator: req.body.creator,
      question: req.body.question,
      title: req.body.tile,
      description: req.body.description,
      code: req.body.code,
      date_created: new Date,
      upvotes: [],
      downvotes: [],
    }

    Answer.create(obj)
      .then(function(answer) {
        res.status(200).json(answer)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message
        })
      })
  }

  static getAnswer(req, res) {
    Answer.findById(req.params.answerId)
      .then(function(answer) {
        res.status(200).json(answer)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static updateAnswer(req, res) {
    Answer.findOneAndUpdate({_id: req.params.answerId}, req.body)
      .then(function(answer) {
        res.status(200).json(answer)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static deleteAnswer(req, res) {
    Answer.deleteOne({_id: req.params.id})
      .then(function(answer) {
        res.status(200).json(answer)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static deleteManyAnswer(req, res) {
    Answer.deleteMany({question: req.params.questionId})
      .then(function(answer) {
        res.status(200).json(answer)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static getAnswersByUser(req, res) {
    Answer.find({creator: req.params.userId})
      .populate({
        path: 'question',
        populate: {
          path: 'creator'
        }
      })
      .then(function(questions) {
        res.status(200).json(questions)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }
}

module.exports = AnswerController