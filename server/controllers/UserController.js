import jwt from 'jsonwebtoken';
import validator from 'validator';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import client from '../models/database';


dotenv.config();

const key = process.env.JWT_KEY;
const saltRounds = 10;


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
   * @param {Object} response - HTTP Response Object containing List of users
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
  static userSignup(request, response, query) {
    const regMail = request.body.email;
    const newUser = {
      fullName: validator.trim(String(request.body.fullName)).replace(/^[a-zA-Z_\-]+$/),
      email: request.body.email,
      password: validator.trim(String(request.body.password)).replace(/\s/g, ''),
    };
    client.query({ text: 'SELECT * FROM users where email = $1', values: [regMail] }).then((foundmail) => {
      if (foundmail.rowCount === 0) {
        return bcrypt.hash(newUser.password, saltRounds, (err, hash) => client.query(
          'INSERT INTO users(fullName, email, pass) VALUES($1, $2, $3)',
          [newUser.fullName, newUser.email, hash],
        )
          .then(() => client.query('SELECT userId, pass FROM users WHERE email = $1', [regMail]))
          .then((data) => {
            const { password, ...user } = data.rows[0];
            return  response.status(201).json({
              success: true,
              user,
              
            });
          })
          .catch(error => response.status(500).json({ message: error.message })));
      }
      return response.status(409).json({
        success: false,
        message: 'An account has already been created with this email address',
      });
    }).catch(error => response.status(500).json({ message: error.message }));


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

    client.query({ text: 'SELECT userId, pass FROM users where email = $1', values: [regMail] })
      .then((foundmail) => {
        if (foundmail.rowCount === 1) {
          const hash = foundmail.rows[0].pass;
          return bcrypt.compare(regPass, hash, (err, result) => {
            if (err) {
              return response.status(500).json({ message: err });
            }
            if (result) {
              const { password, ...user } = foundmail.rows[0];
              return jwt.sign({ user }, key, (error, token) => response.json({
                success: true,
                user,
                token,
              }));
            }
            return response.status(400).json({
              success: false,
              message: 'Your email or password is incorrect',
            });
          });
        }
        return response.status(400).json({
          success: false,
          message: 'Your email or password is incorrect',
        });
      });
  }

  /**
   * @description Get the profile of a logged in user
   *
   * @param {Object} request - HTTP Request
   * @param {Object} response - HTTP Response
   *
   * @returns {object} response JSON Object
   */
  static getUserProfile(request, response) {
    const { userid: userId } = request.user;
    
    client.query('SELECT * FROM users WHERE userId = $1', [userId])
    .then(data => response.status(200).json({
      message: 'User details retrieved',
      data: data.rows,
    })).catch(error => response.status(500).json({ message: error.message }));
  }


}

export default UserController;