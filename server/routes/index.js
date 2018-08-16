import express from 'express';
import Question from '../controllers/QuestionController';

const router = express.Router();

router.get('/questions', Question.getAllQuestions);

export default router;