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




