import chaiHttp from 'chai-http';
import chai from 'chai';
import { describe } from 'mocha';

import app from '../app';


chai.use(chaiHttp);
chai.should();

const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
const user2 = { email: 'ibravoh@gmail.com', password: 'presley0080' };
const newQuestion = { questionTopic: 'Religion', questionBody: 'Who founded Christianity'};

const invalidQuestion1 = { questionTopic: '', questionBody: 'Who founded Christianity' };
const invalidQuestion2 = { questionTopic: 'Religion', questionBody: ''};


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
    
    it('should return error message if question s not found ', (done) => {
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
  });
});