import validator from 'validator';
import Question from '../models/questionQueries';
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
  
  static validateInputs(request, response, next) {
     
    const {
      questionTopic, questionBody, 
    } = request.body;
    if (
      !questionTopic ||  questionTopic === undefined ||  questionTopic.toString().trim() === '' || typeof  questionTopic !== 'string'
    ) {
      return response.status(400).send({
        success: 'false',
        message: 'Question Topic is required',
      });
    }

    if (
      !questionBody || questionBody === undefined || questionBody.toString().trim() === ''
    ) {
      return response.status(400).send({
        success: 'false',
        message: 'question body is required',
      });
    }
    
    
    return next();
  }
  static searchValidator(request, response, next) {
    const { searchQuery } = request.body;

    if (!searchQuery) {
      return response.status(400).json({
        status: 'error',
        message: 'Search input field is missing!',
      });
    }

    if (searchQuery.trim().length < 1) {
      return response.status(400).json({
        status: 'error',
        message: 'Search input field cannot be empty!',
      });
    }

  
    next();
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
    const questId = request.params.questionId;
    Question.checkNaN(request, response);
    client.query('SELECT userId FROM questions where questionId = $1', [questId])
      .then((data) => {
        Question.noContent(request, response, data, 'There is no question with this ID');
        if (userId === data.rows[0].userid) return next();
        return response.status(403).json({
          success: 'false',
          message: 'You dont have permission to delete this question',
        });

      })

  }

}



export default QuestionValidation;