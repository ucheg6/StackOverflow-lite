import express from 'express';
import UserController from '../controllers/UserController';
import QuestionController from '../controllers/QuestionController';
import AnswerController from '../controllers/AnswerController';
import SignupValidation from '../validation/user';
import AnswerValidation from '../validation/answers';
import QuestionValidation from '../validation/questions';
import Middleware from '../middleware/users';


const router = express.Router();


router.post('/auth/signup', SignupValidation.validateUserInputs, SignupValidation.checkLength, UserController.userSignup);
router.post('/auth/login', SignupValidation.signInValidation, SignupValidation.checkLength, UserController.userLogin);

router.get('/user',  UserController.getUserProfile);
router.get('/questions',  QuestionController.getAllQuestions);
router.post('/questions', Middleware.checkUser, QuestionValidation.validateInputs, QuestionValidation.checkDuplicateQuery, QuestionController.postQuestion); 
router.delete('/questions/:questionId', Middleware.checkUser, QuestionValidation.authorizeDeleteQuestion, QuestionController.deleteQuestion);

router.get('/questions/:questionId', Middleware.checkUser, QuestionController.getQuestion);
router.get('/user/questions', Middleware.checkUser, QuestionController.getUserQuestions);
router.post('/questions', Middleware.checkUser, QuestionValidation.checkQuestion,QuestionValidation.checkDuplicateQuery, QuestionController.postQuestion); 
router.post('/search', QuestionController.searchQuestions);

router.post('/questions/:questionId/answers', Middleware.checkUser, AnswerValidation.validateAnswer, AnswerController.postAnswer);
router.put('/questions/:questionId/answers/:answerId', Middleware.checkUser, AnswerController.acceptAnswer);

router.all('*', (request, response) => {
  const error = {
    message: "I'm pretty sure this is not what you are looking for, please enter a valid route",
  };
  return response.status(404).json({
    message: error.message,
    status: 'error',
    error,
  });
});

export default router;