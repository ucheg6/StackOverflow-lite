import validator from 'validator';

class SignupValidation {
  /**
 * @method validateUserInputs
 * @static
 * @description This sanitizes auth data
 * @param {object} request request object
 * @param {object} response response object
 * @returns {Object} Object
 */
static validateUserInputs(request, response, next) {
  const {
    fullName, email, password,
  } = request.body;
  const nameFormat = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/;
  const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (fullName === undefined || email === undefined || password === undefined) {
    return response.status(400).json({
      success: 'false',
      message: 'Please insert valid inputs in all fields'
    });
  }
  if (fullName.trim() === '' || email.trim() === '' || password.trim() === '') {
    return response.status(400).json({
      success: 'false',
      message: 'please fields cannot be empty'
    });
  }
  if (nameFormat.test(fullName)) {
    return response.status(400).json({
      success: 'false',
      message: 'Full Name cannot contain special character',
    });
  }

  if (!emailPattern.test(email.trim())) {
    return response.status(400).json({
      success: 'false',
      message: 'Email format is invalid',
    });
  }
  
  return next();
}

static checkLength(request, response, next) {
  const { password, fullName} = request.body;
  let isValid = true;
  const errors = {};

  if (fullName && !(validator.isLength(fullName, { min: 2, max: 20 }))) {
    isValid = false;
    errors.fullName = 'The length of your full name should be between 2 and 20';
  }
  if (password && !(validator.isLength(password, { min: 6, max: 15 }))) {
    isValid = false;
    errors.password = 'your Password length should be between 6 and 15';
  }
  if (isValid) {
    return next();
  }
  return response.status(400).json({
    success: 'false',
    errors,
  });
}

/**
* @method signInValidation
* @static
* @description This validates user login
* @param {object} request request object
* @param {object} response response object
*
* @returns {Object} Object
*/
static signInValidation(request, response, next) {
  const { email, password } = request.body;
  if ((email === undefined || email.trim() === '') || (password.trim() === '' || password === undefined)) {
    return response.status(400).json({
      success: 'false',
      message: 'Please insert valid input in fields'
    });
  }
  return next();
}

  
}

export default SignupValidation;