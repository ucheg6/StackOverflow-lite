const seeds = `
 INSERT INTO users (fullName,email,pass) 
    VALUES ('Chuma Ndoeche','chumaNdoeche@gmail.com','presley0080');
     INSERT INTO users (fullName,email,pass) 
    VALUES ('Ibrahim Ilyasu','ibravoh@gmail.com','presley0080');
     INSERT INTO users (fullName,email,pass) 
    VALUES ('Ginika Akogwu','ginika@gmail.com','presley0080');
     INSERT INTO users (fullName, email,pass) 
    VALUES ('Christy Akogwu','christy@gmail.com','presley0080');

INSERT INTO questions (userId,questionTopic,questionBody) 
    VALUES ('1','religion','who founded christianity');

`
const query = `${seeds}`;

export default query;