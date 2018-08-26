class Question {
  /**
   * @description Method to check for non-numbers
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static checkNaN(request, response) {
    const questId = parseInt(request.params.questionId, 10);
    if (Number.isNaN(questId)) {
      return response.status(400).json({
        success: false,
        message: 'Your question ID is invalid. Please enter a number',
      });
    }
    return null;
  }

  /**
   * @description Method to check for unavailable question Ids
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static noContent(request, response, data, errorMessage) {
    if (data.rows.length === 0) {
      return response.status(404).json({
        success: false,
        message: errorMessage,
      });
    }
    return null;
  }

  /**
   * @description Query to select a question
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static selectAQuestion(request, response) {
    const questId = parseInt(request.params.questionId, 10);
    const { userid: userId } = request.user;
    Question.checkNaN(request, response);
    return client.query('select * from questions where userId = $1 and questionId = $2', [userId, questId])
      .then((data) => {
        Question.noContent(request, response, data, 'You have no question with this ID');
        return response.status(200)
          .json({
            success: true,
            message: 'Retrieved one question',
            data: data.rows,
          });
      })
      .catch(error => response.status(500).json({ message: error.message }));
  }
  /**
   * @description Query to delete a question
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  

}

export default Question;