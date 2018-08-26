import client from '../models/database';


/**
   * @class QuestionController
   *
   * @export
   *
   */
class QuestionController {
  /**
   * @description Function to get all questions available
   *
   * @param {Object} request - HTTP Request Object
   * @param {Object} response - HTTP Response Object containing List of questions
   *
   * @returns {object} response JSON Object
   */
  static getAllQuestions(request, response, next) {
    client.query('SELECT * FROM questions').then((data) => {
      if (data.rows.length > 0) {
        return response.status(200).json({
          message: 'Questions successfully retrieved',
          data: data.rows,
        });
      }
      return response.status(404).json({
        message: 'You have no questions to retrieve',
      });
    }).catch(error => next(error));

  }

  
}


export default QuestionController;