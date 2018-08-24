import jwt from 'jsonwebtoken';
import validator from 'validator';
import client from '../models/database';

  /**
   * @class UserController
   *
   * @export
   *
   */
class UserController {
  /**
   * @description Function to get all users available
   *
   * @param {Object} request - HTTP Request Object
   * @param {Object} response - HTTP Response Object containing List of questions
   *
   * @returns {object} response JSON Object
   */
  static getAllUsers(request, response) {
    client.query('SELECT * FROM users')
      .then(data => response.status(200)
        .json({
          status: 'Users successfully retrieved',
          data: data.rows,
        }))
      .catch(error => response.status(500).json({ message: error.message }));
  }

  /**
   * @description Sign up query for new users
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static signUpQuery(request, response, query) {
    const regMail = request.body.email;
    client.query({ text: 'SELECT * FROM users where email = $1', values: [regMail] }).then((foundmail) => {
      if (foundmail.rowCount === 0) {
        return client.query(query)
          .then(() => client.query('SELECT * FROM users WHERE email = $1', [regMail]))
          .then(data => jwt.sign({ user: data.rows[0] }, 'secretKey', (err, token) => response.status(201).json({
            success: true,
            data: data.rows[0],
            token,
          })))
          .catch(error => response.status(500).json({ message: error.message }));
      }
      return response.status(409).json({
        success: false,
        message: 'An account has already been created with this email address',
      });
    });
  }


  static userSignup(request, response) {
    const newUser = {
      fullName: validator.trim(String(request.body.fullName)).replace(/ +(?= )/g, ''),
      email: request.body.email,
      password: validator.trim(String(request.body.password)).replace(/\s/g, ''),
    };
    const query = {
      text: 'INSERT INTO users(fullName, email, pass) VALUES($1, $2, $3)',
      values: [newUser.fullName, newUser.email, newUser.password],
    };
    return UserController.signUpQuery(request, response, query, newUser);
  }

  /**
   * @description Login function for registered users
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static userLogin(request, response) {
    const regMail = request.body.email;
    const regPass = request.body.password;

    client.query({ text: 'SELECT * FROM users where email = $1 and pass = $2', values: [regMail, regPass] })
      .then((foundmail) => {
        if (foundmail.rowCount === 1 && regPass) {
          jwt.sign({ user: foundmail.rows[0] }, 'secretKey', (err, token) => response.json({
            success: true,
            foundmail: foundmail.rows,
            token,
          }))
            .catch(error => response.status(500).json({ message: error.message }));
        }
        response.status(400).json({
          success: false,
          message: 'Your email or password is incorrect',
        });
        return null;
      });
  }


}

export default UserController;