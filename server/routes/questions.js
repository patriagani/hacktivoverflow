var express = require('express');
var router = express.Router();
const QuestionController = require('../controllers/QuestionController')

router.get('/', QuestionController.getQuestions)

router.post('/', QuestionController.createQuestion)

router.get('/:questionId', QuestionController.getQuestion)

router.patch('/:questionId', QuestionController.updateQuestion)

router.delete('/:questionId', QuestionController.deleteQuestion)

router.get('/user/:userId', QuestionController.getQuestionsByUser)



module.exports = router;