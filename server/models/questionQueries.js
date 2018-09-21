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

   

}

export default Question;