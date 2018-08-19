export default class Validate {
    static validateQuestion(request, response, next) {
      const { userId, question} = request.body;
     
      if (!userId || userId === '' || userId === undefined) {
        return response.status(400).json({
          status: 'error',
          message: 'userId must be provided',
        });
      }
     
      if (!question || question.trim() === '' || question === undefined) {
        return response.status(400).json({
          status: 'error',
          message: 'question must be available',
        });
      }
      return next();
    }
   
  }