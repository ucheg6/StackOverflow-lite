import express from 'express';
import Question from '../controllers/QuestionController';
import Answer from '../controllers/AnswerController';

const router = express.Router();

router.get('/questions', Question.getAllQuestions);
router.get('/questions/:questionId', Question.getQuestion);
router.post('/questions', Question.postQuestion);
router.delete('/questions/:questionId/delete', Question.deleteQuestion);
router.post('/questions/:questionId/answers', Answer.postAnswer);

export default router;