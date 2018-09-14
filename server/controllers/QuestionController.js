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
    Question.checkNaN(request, response);
    return client.query('DELETE FROM questions where questionId = $1', [questId])
      .then(() => response.status(200)
        .json({
          success: true,
          message: 'Question successfully deleted',
        })).catch(error => response.status(500).json({ message: error.message }));
  }

  /**
     * @description - get single Question by Id and associated answers
     * @static getQuestion
     * 
     * @param {object} request - HTTP Request Object containing question id
     * @param {object} response - HTTP Response Object containing question
     * 
     * @memberof QuestionController
     * 
     * @returns {Promise<object>}
     */

  static getQuestion(request, response) {
    const questId = parseInt(request.params.questionId, 10);

    Question.checkNaN(request, response);
    client.query('SELECT a.answerId, a.answer, a.is_preferred, u.fullName  FROM answers a INNER JOIN users u ON a.userId = u.userId WHERE a.questionId=$1', [questId])
      .then((answers) => {
        return client.query('SELECT q.questionId, q.questionTopic, q.questionBody, u.fullName FROM questions q INNER JOIN users u ON q.userId = u.userId WHERE q.questionId=$1', [questId])
          .then((data) => {
            Question.noContent(request, response, data, 'There is no question with this ID');
            return response.status(200)
              .json({
                success: true,
                message: 'Question Retrieved',
                data: data.rows,
                answers: answers.rows,

              });
          })
      })
      .catch(error => response.status(500).json({ message: error.message }));


  }
  /**
     * @description - This method returns all question for a user
     * @static getUserQuestions
     * 
     * @param {object} request - HTTP Request Object 
     * @param {object} response - HTTP Response Object containing questions by the user
     * 
     * @memberof QuestionController
     * 
     * @returns {Promise<object>}
     */
  static getUserQuestions(request, response) {
    const { userid: userId } = request.user;

    client.query('SELECT a.answerId, a.answer, a.is_preferred, u.fullName  FROM answers a INNER JOIN users u ON a.userId = u.userId WHERE a.userId=$1', [userId])
      .then((answers) => {
        return client.query('SELECT q.questionId, q.questionTopic, q.questionBody, u.fullName FROM questions q INNER JOIN users u ON q.userId = u.userId WHERE q.userId=$1', [userId])
          .then((data) => {
            if (data.rows.length > 0) {
              return response.status(200)
                .json({
                  success: true,
                  message: 'User\'s Questions successfully Retrieved',
                  data: data.rows,
                  answers: answers.rows,

                });
            }
            return response.status(404).json({
              message: 'You have no questions to retrieve',
            });
          })
      })
      .catch(error => response.status(500).json({ message: error.message }));

  }
  /**
     * @description - This method returns all searched questions
     * @static getUserQuestions
     * 
     * @param {object} request - HTTP Request Object containing search query
     * @param {object} response - HTTP Response Object containing searched questions 
     * 
     * @memberof QuestionController
     * 
     * @returns {Promise<object>}
     */
  static searchQuestions(request, response) {
    const { searchQuery } = request.body
    client.query({
      text: `SELECT * FROM questions 
     where questionTopic ilike 
    '%${searchQuery}%' or questionBody ilike '%${searchQuery}%'`
    })
      .then((questions) => {
        if (questions.rows.length === 0) {
          return response.status(404).json({
            status: 'error',
            message: 'No questions found for that search input!',
          });
        }

        return response.status(200).json({
          status: 'success',
          message: 'Questions retrieved successfully!',
          data: questions.rows,
        });
      })
      .catch(error => response.status(500).json({ message: error.message }));
  }
  /**
    * @static
    *
    * @param {object} request - The request object
    * @param {object} response - The response object containing questions with the most answers
    *
    * @returns {Promise<object>}
    *
    * @description This method returns the question object
    * 
    */
  static QuestionsWithMostAnswers(request, response) {
    client.query({
      text: `SELECT questions.*, count(answers.questionid) as answersnumber from questions 
    left join answers on (questions.questionid = answers.questionid) group by questions.questionid order 
    by count(answers.questionid) desc `
    })
      .then((questions) => {
        if (questions.length === 0) {
          return response.status(404).json({
            status: 'error',
            message: 'No question was found!'
          });
        }
        return response.status(200).json({
          status: 'success',
          message: 'Questions retrieved successfully!',
          data: questions.rows,
        });
      })
      .catch(error => response.status(500).json({ message: error.message }));


  }




}


export default QuestionController;