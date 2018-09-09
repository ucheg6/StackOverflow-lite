\c stackoverflow_lite_test;


DROP TABLE IF EXISTS users CASCADE;
CREATE TABLE users (
 userId serial PRIMARY KEY,
 fullName VARCHAR (50) NOT NULL,
 email VARCHAR (50) NOT NULL,
 pass VARCHAR (250) NOT NULL,
 created_at TIMESTAMP DEFAULT NOW()
);

DROP TABLE IF EXISTS questions CASCADE;
CREATE TABLE questions (
 questionId serial PRIMARY KEY,
 userId INT NOT NULL,
 questionTopic VARCHAR (50) NOT NULL,
 questionBody VARCHAR (255) NOT NULL,
 created_at TIMESTAMP  DEFAULT NOW(),
 FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE CASCADE
);

DROP TABLE IF EXISTS answers CASCADE;
CREATE TABLE answers(
  answerId SERIAL PRIMARY KEY,
  questionId INT NOT NULL,
  userId INT NOT NULL,
  answer VARCHAR (150) NOT NULL,
  is_preferred BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT NOW(),
  FOREIGN KEY (questionId) REFERENCES questions (questionId) ON DELETE CASCADE,
  FOREIGN KEY (userId) REFERENCES users (userId)ON DELETE CASCADE
);

-- INSERT INTO users (fullName,email,pass) 
--     VALUES ('Chuma Ndoeche','chumaNdoeche@gmail.com','presley0080');
--      INSERT INTO users (fullName,email,pass) 
--     VALUES ('Ibrahim Ilyasu','ibravoh@gmail.com','presley0080');
--      INSERT INTO users (fullName,email,pass) 
--     VALUES ('Ginika Akogwu','ginika@gmail.com','presley0080');
--      INSERT INTO users (fullName, email,pass) 
--     VALUES ('Christy Akogwu','christy@gmail.com','presley0080');

-- INSERT INTO questions (userId,questionTopic,questionBody) 
--     VALUES ('1','religion','who founded christianity');