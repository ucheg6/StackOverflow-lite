
class AnswerValidation {
  /**
 * @description Middleware for new answer validation
 *
 * @param {Object} request - HTTP Request
 * @param {Object} response - HTTP Response
 *
 * @returns {object} response JSON Object
 */
  static checkAnswer(request, response, next) {
    const { answer, } = request.body;
    let isValid = true;
    const errors = {};

    if (!answer) {
      isValid = false;
      errors.answer = 'The answer is required';
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

export default AnswerValidation;
