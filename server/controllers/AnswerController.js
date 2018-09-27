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
    const { answer } = request.body;

    if (isNaN(questionId)) {
      return response.status(400).json({
        success: 'false',
        message: 'Your question ID is invalid. Please enter a number',
      });
    }

    const newAnswer = {
      answer: validator.trim(String(request.body.answer.toLowerCase())),
      questionId: parseInt(questionId, 10),

    };

    const query = {
      text: 'INSERT INTO answers(userId, answer, questionId) VALUES($1, $2, $3)',
      values: [userId,
        answer,
        questionId],
    };
    client.query('SELECT * FROM questions WHERE questionid = $1', [questionId], )
      .then((data) => {
        Question.noContent(request, response, data, 'There is no question with this ID');
      return client.query(query).then(() => {
           client.query('UPDATE users SET answerCount = answerCount + 1 where userId=$1 ',
            [userId])
        }).then(() => response.status(201).json({
          success: 'true',
          message: 'Answer Successfully created',
          newAnswer,
        }))

      }).catch(error => response.status(500).json({ message: error.message }));
  }

  /**
  * Updates an answer
  * @param {object} request -HTTP Request
  * @param {object} response -HTTP Response
  * @returns {object} Updated answer object
  * or error object if answer is not found
  */
  static acceptAnswer(request, response) {
    const questId = parseInt(request.params.questionId, 10);
    const answerId = parseInt(request.params.answerId, 10);
    const is_preferred = 'true';
    const { userid: userId } = request.user;
    client.query('SELECT * FROM questions WHERE questionId =$1', [questId])
      .then((data) => {
        Question.noContent(request, response, data, 'There is no question with this ID');
        client.query('SELECT questions.userId FROM questions WHERE questions.userId=$1', [userId])
          .then((data) => {
            if (data.rows < 1) {
              return response.status(401).json({ message: 'You are not authorized for this action' });
            }

            return client.query('UPDATE answers SET is_preferred=$1  where answerId=$2 AND questionId=$3',
              [is_preferred, answerId, questId])
              .then(() => {
                response.status(200).json({
                  status: 'success',
                  message: 'answer marked as accepted',
                })
              })

          })
      }).catch(error => response.status(500).json({ message: error.message }));

  }
  /**
* @description method to upvote an answer
* 
* @static voteAnswer
* 
* @param {Object} request - HTTP Request
* @param {Object} response - HTTP Response
*
* @returns {object} response JSON Object
* 
*
* @returns { Object } JSON Object
*/
  static upVoteAnswer(request, response) {
    const questId = parseInt(request.params.questionId, 10);
    const answerId = parseInt(request.params.answerId, 10);

    client.query('SELECT * FROM questions WHERE questionId =$1', [questId])
      .then((data) => {
        Question.noContent(request, response, data, 'There is no question with this ID');
        client.query('SELECT * FROM answers WHERE answerid = $1', [answerId])
          .then((answer) => {
            if (answer.rows < 1) {
              return response.status(404).json({
                status: 'error',
                message: 'Answer not found!',
              });
            }

            return client.query('UPDATE answers SET upvotes = upvotes + 1 where answerId=$1 AND questionId=$2 RETURNING upvotes',
              [answerId, questId])
              .then((upvote) => {
                response.status(200).json({
                  status: 'success',
                  message: 'answer upvoted successfully',
                  result: upvote.rows,
                })
              })

          })
      }).catch(error => response.status(500).json({ message: error.message }));

  }

  /**
* @description method to downvote an answer
* 
* @static voteAnswer
* 
* @param {Object} request - HTTP Request
* @param {Object} response - HTTP Response
*
* @returns {object} response JSON Object
* 
*
* @returns { Object } JSON Object
*/
  static downVoteAnswer(request, response) {
    const questId = parseInt(request.params.questionId, 10);
    const answerId = parseInt(request.params.answerId, 10);

    client.query('SELECT * FROM questions WHERE questionId =$1', [questId])
      .then((data) => {
        Question.noContent(request, response, data, 'There is no question with this ID');
        client.query('SELECT * FROM answers WHERE answerid = $1', [answerId])
          .then((answer) => {
            if (answer.rows < 1) {
              return response.status(404).json({
                status: 'error',
                message: 'Answer not found!',
              });
            }

            return client.query('UPDATE answers SET downvotes = downvotes + 1 where answerId=$1 AND questionId=$2 RETURNING downvotes',
              [answerId, questId])
              .then((downvote) => {
                response.status(200).json({
                  status: 'success',
                  message: 'answer downvoted successfully',
                  result: downvote.rows,
                })
              })

          })
      }).catch(error => response.status(500).json({ message: error.message }));

  }
}
export default AnswerController;