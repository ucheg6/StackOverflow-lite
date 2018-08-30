// const user1 = { email: 'notexistent@gmail.com', password: 'faker' };
// const user2 = { email: 'chuks@gmail.com', password: 'presley0080' };

// const newAnswer = { answer: 'Answer!!!' };
// const invalidAnswer = { answer: '' };

// describe(' Answer Controller TEST', () => {
//   describe('POST Answer', () => {
//     it('should report 401 on users not logged in', (done) => {
//       chai.request(app)
//         .post('/api/v1/questions/2/answers')
//         .send(user1)
//         .end((error, response) => {
//           response.status.should.eql(401);
//           response.type.should.eql('application/json');
//           response.body.message.should.eql('Please Login or Signup to gain access');
//           console.log(error)
//           done();
//         });
//     });
//     it('should successfully create a valid request for a logged in user', (done) => {
//       chai.request(app)
//         .post('/api/v1/auth/login')
//         .send(user2)
//         .then((reply) => {
//           reply.body.should.have.property('token');
//           chai.request(app)
//             .post('/api/v1/questions/2/answers')
//             .set('authorization', `Bearer ${reply.body.token}`)
//             .send(newAnswer)
//             .end((err, response) => {
//               response.should.have.status(201);
//               expect(response.body.answer).to.equal('Answer!!!');
//               response.body.message.should.eql('Answer Successfully created');
//               done();
//             });
//         });
//     });
//     it('should avoid making duplicate answers for a logged in user', (done) => {
//       chai.request(app)
//         .post('/api/v1/auth/login')
//         .send(user2)
//         .then((reply) => {
//           reply.body.should.have.property('token');
//           chai.request(app)
//             .post('/api/v1/questions/2/answers')
//             .set('authorization', `Bearer ${reply.body.token}`)
//             .send(newAnswer)
//             .end((err, response) => {
//               response.should.have.status(409);
//               response.body.message.should.eql('You cannot make duplicate answers');
//               done();
//             });
//         });
//     });
//     it('should return a message when the answer input is omitted', (done) => {
//       chai.request(app)
//         .post('/api/v1/auth/login')
//         .send(user2)
//         .then((reply) => {
//           reply.body.should.have.property('token');
//           chai.request(app)
//             .post('/api/v1/questions/2/answers')
//             .set('authorization', `Bearer ${reply.body.token}`)
//             .send(invalidAnswer)
//             .end((err, response) => {
//               response.should.have.status(400);
//               response.body.errors.product.should.eql('The answer is required');
//               done();
//             });
//         });
//     });
    
//   });
// });