# StackOverflow-lite
StackOverflow-lite is a platform where people can ask questions and provide answers to questions


[![Build Status](https://travis-ci.org/ucheg6/StackOverflow-lite.svg?branch=develop)](https://travis-ci.org/ucheg6/StackOverflow-lite)
[![Coverage Status](https://coveralls.io/repos/github/ucheg6/StackOverflow-lite/badge.svg?branch=develop)](https://coveralls.io/github/ucheg6/StackOverflow-lite?branch=develop)
[![Maintainability](https://api.codeclimate.com/v1/badges/d151392d36b3bc923567/maintainability)](https://codeclimate.com/github/ucheg6/StackOverflow-lite/maintainability)



# Features

   1. Users can create an account and login.
   2. Authenticated users can post questions.
   3. Authenticated users can delete their questions.
   4. Authenticated Users can post answers to questions.
   5. Users can view answers to questions.
   6. Users can mark an answer as the accepted answer to their question.

# Extra Features

   1. Authenticated users can upvote or downvote an answer.
   2. Authenticated users get a notification when an answer is given to their question.
   3. Authenticated users can view all the questions they have ever asked on the platform.

# API 
   Heroku  https://stackoverflow-litee.herokuapp.com/

  | METHOD  | DESCRIPTION       | ENDPOINTS                     |
  | --------| -------------     | ----------------              |
  | Get     | Get a Question    | /questions                    |
  | Get     | Get all Questions | /questions/:questionId        |
  | Post    | Post a Question   | /questions                    |
  | Delete  | Delete a Question | /questions/:questionId        | 
  | Post    | Post an answer    | /questions/:questionId/answers| 

# Built With
   - NodeJs/Express
   - PostgreSQL
   
# How to install project
   - Run the command on your command line git clone https://github.com/ucheg6/StackOverflow-lite.git
   - Run npm install to install npm packages for the project

# How to run tests
     Run the command npm run test on your command line to run tests.

# License
  MIT © Uche Akogwu  

# Author
  Uche Akogwu

# Acknowledgments
   - Andela 
   - StackOverflow
  
# Project Management
  Project is managed at (https://www.pivotaltracker.com/n/projects/2189581) using the project management tool, Pivotal Tracker.

  View UI templates hosted on Github pages at (https://ucheg6.github.io/StackOverflow-lite/UI/) 

# License
  MIT © Uche Akogwu  
# Author
  Uche Akogwu
