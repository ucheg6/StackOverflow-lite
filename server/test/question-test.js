import chaiHttp from 'chai-http';
import chai from 'chai';
import { describe } from 'mocha';

import app from '../app';


chai.use(chaiHttp);
chai.should();

const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
const user2 = { email: 'christy@gmail.com', password: 'presley0080' };
const quest = { questionTopic: 'Religion', questionBody: 'Who founded Christianity'}


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
    // it('should successfully delete question for a logged in user', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/questions')
    //     .send(user2)
    //     .then((reply) => {
    //       reply.body.should.have.property('token');
    //       chai.request(app)
    //         .delete('/api/v1/questions/7')
    //         .set('authorization', `Bearer ${reply.body.token}`)
    //         .end((err, response) => {
    //           response.should.have.status(200);
    //           response.body.message.should.eql('Question successfully deleted');
    //           done();
    //         });
    //     });
    // });
    // it('should not permit user to delete another users question ', (done) => {
    //   chai.request(app)
    //     .post('/api/v1/auth/login')
    //     .send(user2)
    //     .then((reply) => {
    //       reply.body.should.have.property('token');
    //       chai.request(app)
    //         .delete('/api/v1/questions/3')
    //         .set('authorization', `Bearer ${reply.body.token}`)
    //         .end((err, response) => {
    //           response.should.have.status(404);
    //           response.body.message.should.eql('You dont have permission to delete this question');
    //           done();
    //         });
    //     });
    // });
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