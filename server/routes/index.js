import express from 'express';
import Question from '../controllers/QuestionController';

const router = express.Router();

router.get('/questions', Question.getAllQuestions);
router.get('/questions/:questionId', Question.getQuestion);

export default router;