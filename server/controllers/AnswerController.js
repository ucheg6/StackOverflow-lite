import client from '../models/database';
import validator from 'validator';
import Question from '../models/questionQueries';

/**
   * @class AnswerController
   *
   * @export
   *
   */
class AnswerController {
  /**
    * @description Query to create a new answer
    *
    * @param {Object} request - HTTP Request
    * @param {Object} response - HTTP Response
    *
    * @returns {object} response JSON Object
    */
  static postAnswer(request, response) {
    const { userid: userId } = request.user;
    const { questionId } = request.params;
    const { answer} = request.body;

    const newAnswer = {
     answer: validator.trim(String(request.body.answer.toLowerCase())),
     questionId: parseInt(questionId, 10),
     
    };
    const query = {
      text: 'INSERT INTO answers(userId, answer, questionId) VALUES($1, $2, $3) ',
    values: [userId,
            answer,
            questionId],
    };
    client.query(query).then(() => response.status(201).json({
      success: true,
      message: 'Answer Successfully created',
      newAnswer,
    })).catch(error => response.status(500).json({ message: error.message }));
  }

}

export default AnswerController;