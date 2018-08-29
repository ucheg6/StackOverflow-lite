import express from 'express';
import UserController from '../controllers/UserController';
import QuestionController from '../controllers/QuestionController';
import AnswerController from '../controllers/AnswerController';
import SignupValidation from '../validation/user';
import QuestionValidation from '../validation/questions';
import Middleware from '../middleware/users';

const router = express.Router();


router.post('/auth/signup', SignupValidation.UserSignup, SignupValidation.validateInput, SignupValidation.checkLength, UserController.userSignup);
router.post('/auth/login', SignupValidation.checkUserLogin, UserController.userLogin);
router.get('/users', Middleware.checkUser, UserController.getAllUsers);

router.get('/questions', Middleware.checkUser, QuestionController.getAllQuestions);
router.post('/questions', Middleware.checkUser, QuestionValidation.checkQuestion, QuestionValidation.checkDuplicateQuery, QuestionController.postQuestion); 
router.delete('/questions/:questionId', Middleware.checkUser, QuestionValidation.authorizeDeleteQuestion, QuestionController.deleteQuestion);

router.post('/questions/:questionId/answers', Middleware.checkUser, AnswerController.postAnswer);

export default router;