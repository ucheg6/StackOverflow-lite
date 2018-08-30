
class AnswerValidation {
  /**
 * @description Middleware for new answer validation
 *
 * @param {Object} request - HTTP Request
 * @param {Object} response - HTTP Response
 *
 * @returns {object} response JSON Object
 */
static validateAnswer(request, response, next) {
  const { answer } = request.body;
  if (
    !answer || answer === undefined || answer.toString().trim() === '' || typeof answer !== 'string'
  ) {
    return response.status(400).send({
      success: 'false',
      message: 'you cannot submit an empty field',
    });
  }
  return next();
}

}

export default AnswerValidation;
