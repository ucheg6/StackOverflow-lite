
class CommentValidation {
  /**
 * @description Middleware for new comment validation
 *
 * @param {Object} request - HTTP Request
 * @param {Object} response - HTTP Response
 *
 * @returns {object} response JSON Object
 */
  static validateComment(request, response, next) {
    const { commentBody } = request.body;
   
    if (
      !commentBody || commentBody === undefined || commentBody.toString().trim() === '' || typeof commentBody !== 'string'
    ) 
    {
      return response.status(400).send({
        success: 'false',
        message: 'Comment is required!',
      });
    }

    return next();
  }

}

export default CommentValidation;
