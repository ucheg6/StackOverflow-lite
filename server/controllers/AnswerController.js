import db from '../models/index';
import questions from '../models/questions';

const { answers } = db;
/**
 * @class Answer
 * 
 * @export
 */
class Answer {
     /**
     * @description - Post an answer
     * @static postAnswer 
     * 
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     * 
     * @memberof Question
     * 
     * @returns {Promise<object>}
     */
    static postAnswer(request, response) {
        const { userId, answer, } = request.body;
        const findQuestion = questions.find(question => question.id === parseInt(request.params.questionId, 10));
        if (findQuestion) {
            const id = answers[answers.length - 1].id + 1;
            const data = {
                id, userId, answer,
            };
            answers.push(data);
            return response.status(201).json({
                status: 'success',
                message: 'Answer added successfully',
                data,
            });
        }
        return response.status(404).json({
            status: 'error',
            message: 'Question does not exist',
        });
    }
}
export default Answer;
