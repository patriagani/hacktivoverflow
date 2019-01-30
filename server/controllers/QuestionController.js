const Question = require('../models/Question')

class QuestionController {

  static getQuestions(req, res) {
    Question.find().populate('creator').populate('answers')
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

  static createQuestion(req, res) {
    let obj = {
      creator: req.body.creator,
      title: req.body.title,
      description: req.body.description,
      code: req.body.code,
      date_created: new Date,
      upvotes: [],
      downvotes: [],
      answers: []
    }

    Question.create(obj)
      .then(function(question) {
        res.status(200).json(question)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message
        })
      })
  }

  static getQuestion(req, res) {
    Question.findById(req.params.questionId).populate('creator')
      .populate({
        path: 'answers',
        populate: {
          path: 'creator'
        }
      })
      .then(function(question) {
        res.status(200).json(question)
      })
      .catch(function(error) {
        console.log(error.message);
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static updateQuestion(req, res) {
    Question.findOneAndUpdate({_id: req.params.questionId}, req.body)
      .then(function(question) {
        res.status(200).json(question)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static deleteQuestion(req, res) {
    Question.deleteOne({_id: req.params.questionId})
      .then(function(question) {
        res.status(200).json(question)
      })
      .catch(function(error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error
        })
      })
  }

  static getQuestionsByUser(req, res) {
    Question.find({creator: req.params.userId})
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

module.exports = QuestionController