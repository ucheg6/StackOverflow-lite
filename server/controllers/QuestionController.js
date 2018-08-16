import db from '../models/index';

const { questions } = db;
/**
 * @class Question
 * 
 * @export
 */
class Question {
    /**
     * @description - get all Questions
     * @static getAllQuestions 
     * 
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     * 
     * @memberof Question
     * 
     * @returns {Promise<object>}
     */
    static getAllQuestions(request, response) {
        return response.status(200).json({
            status: 'success',
            message: 'Question gotten successfully',
            questions,
        });
    }
}

export default Question;


