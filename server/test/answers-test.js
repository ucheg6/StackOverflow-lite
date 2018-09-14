import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();

const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
const user2 = { email: 'ibravoh@gmail.com', password: 'presley0080' };
const user3 = { email: 'chumaNdoeche@gmail.com', password: 'presley0080' };

const newAnswer = { answer: 'Christina Sass!!!' };
const invalidAnswer = { answer: '' };
const newQuestion = { questionTopic: 'politics', questionBody: 'Who is the president of Andela'};

describe(' Answer Controller TEST', () => {
  describe('POST Answer', () => {
    it('should report 401 on users not logged in', (done) => {
      chai.request(app)
        .post('/api/v1/questions/1/answers')
        .send(user1)
        .end((error, response) => {
          response.status.should.eql(401);
          response.type.should.eql('application/json');
          response.body.message.should.eql('Please Login or Signup to gain access');
          done();
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
    it('should successfully create a valid answer for a logged in user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/questions/2/answers')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(newAnswer)
            .end((err, response) => {
              response.should.have.status(201);
              expect(response.body.newAnswer.answer).to.equal('christina sass!!!');
              response.body.message.should.eql('Answer Successfully created');
              done();
            });
        });
    });
    it('should not post answer for non-existent questionID', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/questions/3/answers')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(newAnswer)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('question id does not exist');
              done();
            });
        });
    });
    it('should return a message when the answer input is omitted', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/questions/2/answers')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(invalidAnswer)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('answer is required');
              done();
            });
        });
    });
    it(`should accept answer if user owns the question 
    and owns the answer without providing an answer field`, (done) => {
      chai.request(app)
      .post('/api/v1/auth/login')
      .send(user2)
      .then((reply) => {
        reply.body.should.have.property('token');
        chai.request(app)
          .put('/api/v1/questions/2/answers/1')
          .set('Authorization', `Bearer ${reply.body.token}`)
          .end((err, res) => {
            if (err) done(err);
            expect(res).to.have.status(200);
            expect(res.body.message).to.deep
              .equals('answer marked as accepted');

            expect(res.body).to.have.keys('status', 'message');
            done();
          });
      });
    });
  });
});