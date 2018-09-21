import chaiHttp from 'chai-http';
import chai from 'chai';
import { describe } from 'mocha';

import app from '../app';


chai.use(chaiHttp);
chai.should();

const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
const user2 = { email: 'ibravoh@gmail.com', password: 'presley0080' };
const newComment = { commentBody: 'Just a comment' };

const invalidComment = { commentBody: '' };

describe('Comment Controller tests', () => {
  describe('POST /questions/answers/answerid/comments', () => {
    it('should report 401 on users not logged in', (done) => {
      chai.request(app)
        .post('/api/v1/questions/answers/1/comments')
        .send(user1)
        .end((error, response) => {
          response.status.should.eql(401);
          response.type.should.eql('application/json');
          response.body.message.should.eql('Please Login or Signup to gain access');
          done();
        });
    });

    it('should post comments for a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/questions/answers/1/comments')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(newComment)
            .end((err, response) => {
              response.should.have.status(201);
              response.body.message.should.eql('Comment Successfully created');
              done();
            });
        });
    });
    it('should not post comments for a user', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/questions/answers/90/comments')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(newComment)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('You Can\'t comment on a nonexistent answer!');
              done();
            });
        });
    });

    it('should return a message when commentBody is ommitted', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .post('/api/v1/questions/answers/1/comments')
            .set('authorization', `Bearer ${reply.body.token}`)
            .send(invalidComment)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('Comment is required!');
              done();
            });
        });
    });

    it('should get all comments for an answer', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/questions/answers/1/comments')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.message.should.eql('All comments retrieved!');
              done();
            });
        });
    });
    it('should throw an error when answer ID does not exist', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/questions/answers/90/comments')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('There are no comments yet for this answer!');
              done();
            });
        });
    });
    it('should throw an error when answer ID is NAN', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/questions/answers/j/comments')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('Please use a valid answerId!');
              done();
            });
        });
    });
    it('should throw an error when comment does not exist for an answer', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/questions/answers/2/comments')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(404);
              response.body.message.should.eql('There are no comments yet for this answer!');
              done();
            });
        });
    });
    it('should return all comments for an answer', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user2)
        .then((reply) => {
          reply.body.should.have.property('token');
          chai.request(app)
            .get('/api/v1/questions/answers/1/comments')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(200);
              response.body.message.should.eql('All comments retrieved!');
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
            .get('/api/v1/questions/answers/o/comments')
            .set('authorization', `Bearer ${reply.body.token}`)
            .end((err, response) => {
              response.should.have.status(400);
              response.body.message.should.eql('Please use a valid answerId!');
              done();
            });
        });
    });

  });
});


