import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app';

chai.use(chaiHttp);
const { expect } = chai;

describe('function getAllQuestions of Question', () => {
  it('should return response status 200', (done) => {
    chai.request(app)
      .get('/api/v1/questions')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res).to.be.an('object');
        done();
      });
  });
  it('should return an array of questions', (done) => {
    chai.request(app)
      .get('/api/v1/questions')
      .end((err, res) => {
        if (err) done(err);
        expect(res.body).to.haveOwnProperty('questions');
        expect(res.body.questions).to.be.an('array');
        done();
      });
  });
});

describe('function getQuestion of Question', () => {
  it('should return status code 404 if question does not exist', (done) => {
    chai.request(app)
      .get('/api/v1/questions/10')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body).to.deep.equals({
          status: 'error',
          message: 'Question does not exist',
        });
        done();
      });
  });

  it('should return status code 200 if question exists', (done) => {
    chai.request(app)
      .get('/api/v1/questions/4')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('matchedQuestion');
        expect(res.body.status).to.deep.equals('success');
        expect(res.body.matchedQuestion.question).to.deep.equals('What are Andela\'s core values?');
        expect(res.body.message).to.deep.equal('Question found successfully');
        done();
      });
  });
});

it('should return a validation error for wrong input', (done) => {
  chai.request(app)
    .get('/api/v1/questions/o')
    .end((err, res) => {
      if (err) done(err);
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body).to.deep.equals({
        status: 'error',
        message: 'Question does not exist',
      });
      done();
    });
});


describe('function post question of question ', () => {
it('should return status code 201', (done) => {
  chai.request(app)
    .post('/api/v1/questions')
    .send(
      {
        userId: 4,
        question: 'What is Love?',
      },
    )
    .end((err, res) => {
      if (err) done(err);
      expect(res).to.have.status(201);
      expect(res.body).to.have.property('data');
      expect(res.body.status).to.deep.equals('success');
      done();
    });
});
it('should not create a question if body is missing', (done) => {
  chai.request(app)
    .post('/api/v1/questions')
    .send(
      {
        userId: '',
        question: 'What is an oxymoron?',
      },
    )
    .end((err, res) => {
      if (err) done(err);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.deep.equals('userId must be provided');
      done();
    });
});
it('should not create a question if question is missing', (done) => {
  chai.request(app)
    .post('/api/v1/questions')
    .send(
      {
        userId: 4,
        question: '',
      },
    )
    .end((err, res) => {
      if (err) done(err);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.deep.equals('question must be available');
      done();
    });
});
});

describe('function postAnswer of Question', () => {
  it('it should post answer to a question', (done) => {
    chai.request(app)
      .post('/api/v1/questions/2/answers')
      .send({
        userId: 1,
        answer: 'that is the answer',
      })
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.deep.equal('Answer added successfully');
        done();
      });
});
it('should return status code 404', (done) => {
  chai.request(app)
    .post('/api/v1/questions/50/answers')
    .send({
      userId: 1,
      answer: 'that is the answer',
    })
    .end((err, res) => {
      if (err) done(err);
      expect(res).to.have.status(404);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.deep.equal('Question does not exist');
      done();
    });
});
it('should not create an answer if user ID is missing', (done) => {
  chai.request(app)
    .post('/api/v1/questions/5/answers')
    .send(
      {
        userId: '',
        answer: 'Answer Me',
      },
    )
    .end((err, res) => {
      if (err) done(err);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.deep.equals('userId must be provided');
      done();
    });
});
it('should not create a question if answer is missing', (done) => {
  chai.request(app)
    .post('/api/v1/questions/5/answers')
    .send(
      {
        userId: 4,
        answer: '',
      },
    )
    .end((err, res) => {
      if (err) done(err);
      expect(res).to.have.status(400);
      expect(res.body).to.be.an('object');
      expect(res.body.message).to.deep.equals('answer must be available');
      done();
    });
});
});
describe('function deleteQuestion of Question', () => {
  it('it should delete any question with a specified id', (done) => {
    chai.request(app)
      .delete('/api/v1/questions/1/delete')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(200);
        expect(res.body.message).to.deep.equal('Question was successfully deleted');
        done();
      });
  });
  it('it should not delete a question if the id is unknown', (done) => {
    chai.request(app)
      .delete('/api/v1/questions/10/delete')
      .end((err, res) => {
        if (err) done(err);
        expect(res).to.have.status(404);
        expect(res.body.message).to.deep.equal('Question does not exist');
        done();
      });
  });
});