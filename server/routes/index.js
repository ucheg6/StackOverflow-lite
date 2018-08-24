import express from 'express';
import UserController from '../controllers/UserController';
import SignupValidation from '../validation/user';
import Middleware from '../middleware/users';

const router = express.Router();


router.post('/auth/signup', SignupValidation.UserSignup, SignupValidation.validateInput, SignupValidation.checkLength, UserController.userSignup);
router.post('/auth/login', SignupValidation.checkUserLogin, UserController.userLogin);
router.get('/users', Middleware.checkUser, UserController.getAllUsers);

export default router;