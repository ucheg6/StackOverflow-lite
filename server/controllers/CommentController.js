import client from '../models/database';
import validator from 'validator';

/**
   * @class CommentController
   *
   * @export
   *
   */
class CommentController {
  /**
    * @static postComment
    *
    * @param {object} request - The request object containing commentBody and questionid params
    * @param {object} response - The response object
    *
    * @returns {object} - status Message and the added comment
    *
    * @description This method posts a comment
    * 
    */
  static postComment(request, response) {
    const { userid: userId } = request.user;
    const { answerId } = request.params;
    const { commentBody } = request.body;

    if (isNaN(answerId)) {
      return response.status(400).json({
        success: false,
        message: 'Your answer ID is invalid. Please enter a number',
      });
    }

    const newComment = {
      commentBody: validator.trim(String(request.body.commentBody.toLowerCase())),
      answerId: parseInt(answerId, 10),
    };
    const query = {
      text: 'INSERT INTO comments(userId, answerId, commentBody) VALUES($1, $2, $3) ',
      values: [userId, answerId, commentBody,],
    };
    client.query('SELECT * FROM answers WHERE answerId = $1', [answerId],)
      .then((answer) => {
        if (answer.rows < 1) {
          return response.status(404).json({
            status: 'error',
            message: 'You Can\'t comment on a nonexistent answer!',
          });
        }

        return client.query(query).then((data) => {
          response.status(201).json({
            success: true,
            message: 'Comment Successfully created',
            newComment,
          })

        })
      }).catch(error => response.status(500).json({ message: error.message }));

  }
  /**
    * @static getComment
    *
    * @param {object} request - The request object containing commentBody and questionid params
    * @param {object} response - The response object
    *
    * @returns {object} - status Message and the added comment
    *
    * @description This method posts a comment
    * 
    */

  static getComments(request, response) {
    const { answerId } = request.params;

    if (isNaN(answerId)) {
      return response.status(400).json({
        status: 'error',
        message: 'Please use a valid answerId!',
      });
    }

    client.query('SELECT c.commentId, c.commentBody, u.fullName  FROM comments c INNER JOIN users u ON c.userId = u.userId WHERE c.answerId=$1', [answerId])
      .then((comments) => {
        if (comments.rows < 1) {
          return response.status(404).json({
            status: 'success',
            message: 'There are no comments yet for this answer!',
          });
        }

        return response.status(200).json({
          status: 'success',
          message: 'All comments retrieved!',
          data: comments.rows,
        });
      })
      .catch(error => response.status(500).json({ message: error.message }));
}


}

export default CommentController;