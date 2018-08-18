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
            message: 'Questions found successfully',
            questions,
        });
    }

    /**
     * @description - get single Question by Id
     * @static getQuestion
     * 
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     * 
     * @memberof Question
     * 
     * @returns {Promise<object>}
     */
    static getQuestion(request, response) {
        const matchedQuestion = questions.find(question => question.id === parseInt(request.params.questionId, 10));
        if (!matchedQuestion) {
            return response.status(404).json({
                status: 'error',
                message: 'Question does not exist',
            })
        }
        return response.status(200).json({
            status: 'success',
            message: 'Question found successfully',
            matchedQuestion,
        });
    }

    /**
     * @description - Post Question 
     * @static postQuestion
     * 
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     * 
     * @memberof Question
     * 
     * @returns {Promise<object>}
     */
    static postQuestion(request, response) {
        const { userId, question } = request.body;
        const id = questions[questions.length - 1].id + 1;
        const data = {
            id, userId, question,
        };
        questions.push(data);
        return response.status(201).json({
            status: 'success',
            message: 'Question added successfully',
            data,
        });
    }

     /**
     * @description - Delete Question 
     * @static deleteQuestion
     * 
     * @param {object} request - HTTP Request
     * @param {object} response - HTTP Response
     * 
     * @memberof Question
     * 
     * @returns {Promise<object>}
     */
    static deleteQuestion(request, response) {
        const matchedQuestion = questions.find(question => question.id === parseInt(request.params.questionId, 10));
        if (matchedQuestion) {
            questions.splice(request.params.questionId - 1, 1);
            return response.status(200).json({
                status: 'success',
                message: 'Question was successfully deleted',
            });
        }
        return response.status(404).json({
            status: 'error',
            message: 'Question does not exist',
        });
    }
}

export default Question;


