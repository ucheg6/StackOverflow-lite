import express from 'express';
import Question from '../controllers/QuestionController';
import Answer from '../controllers/AnswerController';
import Validate from '../middleware/validate';




const router = express.Router();

router.get('/questions',  Question.getAllQuestions);
router.get('/questions/:questionId', Question.getQuestion);
router.post('/questions', Validate.validateQuestion, Question.postQuestion);
router.delete('/questions/:questionId/delete', Question.deleteQuestion);
router.post('/questions/:questionId/answers', Validate.validateAnswer, Answer.postAnswer);

export default router;