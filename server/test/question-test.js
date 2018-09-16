import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';

import app from '../app';


chai.use(chaiHttp);
chai.should();

const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
const user2 = { email: 'ibravoh@gmail.com', password: 'presley0080' };
const user3 = { email: 'chumaNdoeche@gmail.com', password: 'presley0080' };

const newQuestion = { questionTopic: 'Religion', questionBody: 'Who founded Christianity'};

const invalidQuestion1 = { questionTopic: '', questionBody: 'Who founded Christianity' };
const invalidQuestion2 = { questionTopic: 'Religion', questionBody: ''};

const search = { searchQuery: 'Who'};
const invalidSearch1 = { searchQuery: 'qqqghdjd'};
const invalidSearch2 = { searchQuery: ''};
const invalidSearch3 = { searchQuery: '  '};

describe('Question Controller tests', () => {
  describe('POST /api/v1/questions', () => {
    it('should report 401 on users not logged in', (done) => {
      chai.request(app)
        .post('/api/v1/questions')
        .send(user1)
        .end((error, response) => {
          response.status.should.eql(401);
          response.type.should.eql('application/json');
          response.body.message.should.eql('Please Login or Signup to gain access');
          done();
        });
    });
    it('should throw an error when the user tries to use an invalid token', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/user/questions')
            .set('authorization', `Bearer 628yrfhkvhuiweuf9fijkqhvheo8hjdeyu8euyewvyvr8oewvh2oe`)
            .end((err, response) => {
              response.should.have.status(401);
              response.body.message.should.eql('Your Token is invalid');
              done();
            });
        });
    });
    it('should throw an error when the user has no question to retrieve', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/user/questions')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('You have no questions to retrieve');
              done();
            });
        });
    });
    it('should throw an error when question doesnt exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/questions/mostanswers')
           .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('No question was found!');
              done();
            });
        });
    });
    it('should post questions for a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
         reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/questions')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(newQuestion)
            .end((err, response) => {
              response.should.have.status(201);
             done();
            });
        });
    });
    it('should get all user questions', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/user/questions')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.message.should.eql('User\'s Questions successfully Retrieved');
              done();
            });
        });
    });
    it('should avoid making duplicate questions for a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
         reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/questions')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(newQuestion)
            .end((err, response) => {
              response.should.have.status(409);
              response.body.message.should.eql('You cannot make duplicate questions');
              done();
            });
        });
    });
    it('should return a message when question Topic is omitted', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
         reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/questions')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(invalidQuestion1)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('Question Topic is required');
              done();
            });
        });
    });
    it('should return a message when the question Body is omitted', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/questions')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(invalidQuestion2)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('question body is required');
              done();
            });
        });
    });
    it('should get a question by the ID', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/questions/1')
           .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.message.should.eql('Question Retrieved');
              done();
            });
        });
    });
    it('should get a question with most answers', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/questions/mostanswers')
           .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.message.should.eql('Questions retrieved successfully!');
              done();
            });
        });
    });
    it('should get all questions', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/questions')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.message.should.eql('Questions successfully retrieved');
              done();
            });
        });
    });
    it('should throw an error when question ID does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/questions/8')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('There is no question with this ID');
              done();
            });
        });
    });
  
  });
});

describe('Question Controller Tests', () => {
  describe('Delete Question tests', () => {
    it('should report 401 on users not logged in', (done) => {
      chai.request(app)
        .delete('/api/v1/questions/2')
        .send(user1)
        .end((error, response) => {
          response.status.should.eql(401);
          response.type.should.eql('application/json');
          response.body.message.should.eql('Please Login or Signup to gain access');
          done();
        });
    });
    
    it('should return error message if question is not found ', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .delete('/api/v1/questions/3')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('There is no question with this ID');
              done();
            });
        });
    });
    
    it('should return bad request status code when logged in user enters non number', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .delete('/api/v1/questions/o')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('Your question ID is invalid. Please enter a number');
              done();
            });
        });
    });
    it('should search questions for a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
         reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/search')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(search)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.message.should.eql('Questions retrieved successfully!');
              expect(response.body).to.have.keys('message', 'data', 'status');
             done();
            });
        });
    });
    it('should return an error if the search doesnt match a question', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
         reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/search')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(invalidSearch1)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('No questions found for that search input!');
              expect(response.body).to.have.keys('message', 'status');
             done();
            });
        });
    });
    it('should return an error if the searchQuery is missing', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
         reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/search')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(invalidSearch2)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('Search input field is missing!');
              expect(response.body).to.have.keys('message', 'status');
             done();
            });
        });
    });
    it('should return an error if the search field input is empty', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
         reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/search')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(invalidSearch3)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('Search input field cannot be empty!');
              expect(response.body).to.have.keys('message', 'status');
             done();
            });
        });
    });
    it('should create user with valid credentials', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullName: 'Chuma Ndoeche',
          email: 'chumaNdoeche@gmail.com',
          password: 'presley0080',
        })
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          response.body.message.should.eql('Hello, Chuma Ndoeche welcome to stackOverflowLite');
          done();
        });
    });
    it('should not delete a question if user is not the author', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user3)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .delete('/api/v1/questions/1')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(403);
              response.body.success.should.eql('false');
              response.body.message.should.eql('You dont have permission to delete this question');
              done();
            });
        });
    });
    it('should delete a question if it exists and user is authorised', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .delete('/api/v1/questions/1')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.message.should.eql('Question successfully deleted');
              done();
            });
        });
    });
   
  });
});