import validator from 'validator';

import client from '../models/database';

class QuestionValidation {
  /**
   * @static
   * 
   * @description Middleware for new questions validation
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   * @param {object} next - The call back function to resume the next middleware
   *
   * @returns {object} response JSON Object
   */
  static checkQuestion(request, response, next) {
    const { questionTopic, questionBody } = request.body;
    let isValid = true;
    const errors = {};

    if (!questionTopic) {
      isValid = false;
      errors.questionTopic = 'The question topic is required';
    }
    if (!questionBody) {
      isValid = false;
      errors.questionBody = 'The question Body is required';
    }
    if (isValid) {
      return next();
    }
    return response.status(400).json({
      success: false,
      errors,
    });
  }


  /**
   *  @static
   * 
   * @description Middleware Query to check for duplicate questions
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   * @param {object} next - The call back function to resume the next middleware
   * 
   * @returns {object} response JSON Object
   */
  static checkDuplicateQuery(request, response, next) {
    const { userid: userId } = request.user;

    const questionTopic = validator.trim(String(request.body.questionTopic.toLowerCase()));
    const questionBody = validator.trim(String(request.body.questionBody.toLowerCase()));

    client.query(
      'select * from questions where userId = $1 AND questionTopic = $2 AND questionBody = $3 ',
      [userId, questionTopic, questionBody],
    )
      .then((data) => {
        if (data.rowCount > 0) {
          return response.status(409).json({
            success: false,
            message: 'You cannot make duplicate questions',
          });
        }
        return next();
      }).catch(error => response.status(500).json({ message: error.message }));
  }

  /**
   * @static
   *
   * @param {object} request - The request sent to the middleware
   * @param {object} response - The response sent back from the middleware
   * @param {object} next - The call back function to resume the next middleware
   *
   * @returns {object} - status Message and the question
   *
   * @description This method validates if a user can delete a question
   * 
   * 
   */
  static authorizeDeleteQuestion(request, response, next) {
    const { userid: userId } = request.user;
    console.log(response)
    if (userId === request.data.userId) return next();
    return response.status(403).json({
      success: 'false',
      message: 'You dont have permission to delete this question',
    });

  }
}

export default QuestionValidation;