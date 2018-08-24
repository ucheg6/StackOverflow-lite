import validator from 'validator';


class SignupValidation {
  static UserSignup(request, response, next) {
    const {
      fullName, email, password,
    } = request.body;
    let isValid = true; const errors = {};

    if (!fullName) {
      isValid = false;
      errors.fullName = 'Full name is required';
    }
    if (!email) {
      isValid = false;
      errors.email = 'Your email is required';
    }
    if (!password) {
      isValid = false;
      errors.password = 'Your password is required';
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  }

  static validateInput(request, response, next) {
    const { email } = request.body;
    let isValid = true;
    const errors = {};

    if (email && !validator.isEmail(email)) {
      isValid = false;
      errors.email = 'Your email is invalid';
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  }

  static checkLength(request, response, next) {
    const { password, fullName} = request.body;
    let isValid = true;
    const errors = {};

    if (fullName && !(validator.isLength(fullName, { min: 1, max: 20 }))) {
      isValid = false;
      errors.fullName = 'The length of your full name should be between 1 and 20';
    }
    if (password && !(validator.isLength(password, { min: 6, max: 15 }))) {
      isValid = false;
      errors.password = 'your Password length should be between 6 and 15';
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  }

  static checkUserLogin(request, response, next) {
    const { email, password } = request.body;
    let isValid = true;
    const errors = {};

    if (!email) {
      isValid = false;
      errors.email = 'Your email is required';
    }
    if (!password) {
      isValid = false;
      errors.password = 'Your password is required';
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  }
}

export default SignupValidation;