DROP DATABASE IF EXISTS stackoverflowlite;
CREATE DATABASE stackoverflowlite;

\c stackoverflowlite;

CREATE TABLE users (
 userId serial PRIMARY KEY,
 fullName VARCHAR (50) NOT NULL,
 email VARCHAR (50) NOT NULL,
 pass VARCHAR (20) NOT NULL
);

CREATE TABLE questions (
 questionId serial PRIMARY KEY,
 userId INT NOT NULL,
 questionTopic VARCHAR (50) NOT NULL,
 questionBody VARCHAR (255) NOT NULL,
 FOREIGN KEY (userId) REFERENCES users (userId)
);

CREATE TABLE answers(
  answerId SERIAL PRIMARY KEY,
  questionId INT NOT NULL,
  userId INT NOT NULL,
  body VARCHAR (150) NOT NULL,
  is_preferred BOOLEAN DEFAULT false,
  FOREIGN KEY (questionId) REFERENCES questions (questionId),
  FOREIGN KEY (userId) REFERENCES users (userId)
);

-- seeding
    INSERT INTO users (fullName,email,pass) 
    VALUES ('Uche Akogwu','akogwuuche@ymail.com','presley0080');
    INSERT INTO users (fullName,email,pass) 
    VALUES ('Dika Okwa','dikaeinstein@gmail.com','presley0080');
    INSERT INTO users (fullName,email,pass) 
    VALUES ('Ibrahim Ilyasu','ibravoh@gmail.com','presley0080');


   INSERT INTO questions (userId,questionTopic,questionBody) 
   VALUES (1,'Politics','How can we legally impeach a sitting president in a democracy?');
   INSERT INTO questions (userId,questionTopic,questionBody) 
   VALUES (2,'Programming','What are the fundamentals of software development?');
   INSERT INTO questions (userId,questionTopic,questionBody) 
   VALUES (3,'Religion','Do you think the backwardness of our economy should be blamed on religion?');

   INSERT INTO answers (questionId,userId,body,is_preferred) 
   VALUES (1,2,'We can by getting the majority of NASS members to vote against him',false);
   INSERT INTO answers (questionId,userId,body,is_preferred)  
   VALUES (2,3,'The fundamentals are html, css and javascript',false);
   INSERT INTO answers (questionId,userId,body,is_preferred)  
   VALUES (3,1,'I think it should be blamed on government and not religion',false);




