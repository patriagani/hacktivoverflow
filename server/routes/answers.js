var express = require('express');
var router = express.Router();
const AnswerController = require('../controllers/AnswerController')

router.get('/', AnswerController.getAnswers)

router.post('/', AnswerController.createAnswer)

router.get('/:answerId', AnswerController.getAnswer)

router.patch('/:answerId', AnswerController.updateAnswer)

router.delete('/:answerId', AnswerController.deleteAnswer)

router.delete('/many/:questionId', AnswerController.deleteManyAnswer)

router.get('/user/:userId', AnswerController.getAnswersByUser)




module.exports = router;