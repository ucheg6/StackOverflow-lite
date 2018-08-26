import express from 'express';
import UserController from '../controllers/UserController';
import QuestionController from '../controllers/QuestionController';
import SignupValidation from '../validation/user';
import Middleware from '../middleware/users';

const router = express.Router();


router.post('/auth/signup', SignupValidation.UserSignup, SignupValidation.validateInput, SignupValidation.checkLength, UserController.userSignup);
router.post('/auth/login', SignupValidation.checkUserLogin, UserController.userLogin);
router.get('/users', Middleware.checkUser, UserController.getAllUsers);

router.get('/questions', Middleware.checkUser, QuestionController.getAllQuestions);


export default router;