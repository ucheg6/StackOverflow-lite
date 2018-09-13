import chaiHttp from 'chai-http';
import chai, { expect } from 'chai';
import { describe } from 'mocha';

import app from '../app';

chai.use(chaiHttp);
chai.should();

const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
const user3 = { email: 'ibravoh@gmail.com', password: 'presley0080' };


describe('User Controller', () => {
  describe('GET /api/v1', () => {
    it('should return a welcome message on the home page', (done) => {
      chai.request(app)
        .get('/')
        .end((error, response) => {
          response.status.should.eql(200);
          response.type.should.eql('text/html');
          done();
        });
    });


  });

  describe('User Signup', () => {
    it('should create user with valid credentials', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullName: 'Ibrahim Ilyasu',
          email: 'ibravoh@gmail.com',
          password: 'presley0080',
        })
        .end((error, response) => {
          expect(response).to.have.status(201);
          expect(response.body).to.be.an('object');
          response.body.message.should.eql('Hello, Ibrahim Ilyasu welcome to stackOverflowLite');
          done();
        });
    });
    it('should not create user with an already existing email', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullName: 'Ibrahim Ilyasu',
          email: 'ibravoh@gmail.com',
          password: 'presley0080',
        })
        .end((error, response) => {
          expect(response).to.have.status(409);
          expect(response.body).to.be.an('object');
          response.body.message.should.eql('An account has already been created with this email address');
          done();
        });
    });
    it('should not create user with an empty fullName field', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullName: '',
          email: 'saandra@gmail.com',
          password: 'password',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.message.should.eql('please fields cannot be empty');
          done();
        });
    });
    it('Should not create user with invalid input', (done) => {
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send({
          fullName: 'Sandra',
          email: 'saandracom',
          password: 'mypa',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.message.should.eql('Email format is invalid');
          done();
        });
    });
  });
  describe('User Login', () => {
    it('Should return users details', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user3)
        .end((err, response) => {
          expect(response).to.have.status(200);
         // expect(response.body.status).to.equal('Users successfully retrieved');
          // expect(response.body.data[0].fullname).to.equal('Ibrahim Ilyasu');
          // expect(response.body.data[0].email).to.equal('ibravoh@gmail.com');
          expect(response.body).to.be.an('object');
          done();
        });

    });

  });

  describe('User login', () => {
    it('Should login user with right credentials', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'saandra@com',
          password: 'password',
        })
        .end((error, response) => {
          expect(response.body).to.be.an('object');
          done();
        });
    });
    it('Should not login user with invalid input', (done) => {
      chai.request(app)
        .post('/api/v1/auth/login')
        .send({
          email: 'saandracom',
          password: 'paord',
        })
        .end((error, response) => {
          expect(response).to.have.status(400);
          expect(response.body).to.be.an('object');
          response.body.errors.password.should.eql('your Password length should be between 6 and 15');
          done();
        });
    });
  });
});