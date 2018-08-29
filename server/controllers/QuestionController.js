import client from '../models/database';
import validator from 'validator';
import Question from '../models/questionQueries';

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

  /**
 * @description Query to create a new question
 *
 * @param {Object} request - HTTP Request
 * @param {Object} response - HTTP Response
 *
 * @returns {object} response JSON Object
 */
  static postQuestion(request, response) {
    const { userid: userId } = request.user;

    const newQuestion = {
      questionTopic: validator.trim(String(request.body.questionTopic.toLowerCase())),
      questionBody: validator.trim(String(request.body.questionBody.toLowerCase())),
    };
    const query = {
      text: 'INSERT INTO questions(userId, questionTopic, questionBody) VALUES($1, $2, $3) ',
    values: [userId,
        newQuestion.questionTopic,
        newQuestion.questionBody],
    };
    client.query(query).then(() => response.status(201).json({
      success: true,
      message: 'Question Successfully created',
      newQuestion,
    })).catch(error => response.status(500).json({ message: error.message }));
  }

   /**
   * @description Query to delete existing question
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static deleteQuestion(request, response) {
    const questId = parseInt(request.params.questionId, 10);
       return client.query('DELETE FROM questions where questionId = $1', [questId])
      .then(() => response.status(200)
        .json({
          success: true,
          message: 'Question successfully deleted',
        })).catch(error => response.status(500).json({ message: error.message }));
  }


}


export default QuestionController;