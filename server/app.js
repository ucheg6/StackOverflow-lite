import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes';
import cors from 'cors';

const app = express();

const port = process.env.PORT || 5000;

app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/',express.static('UI'));

app.use('/api/v1', routes);


app.get('/', (req, res) => {
  const welcome = "<h1>Welcome to the StackOverflow-lite API Version 1.0</h1>  <h2>API Endpoints</h2>  These are the endpoints you can currently access.  <h2>GET /api/v1/questions/</h2>  This retrieves all the questions from the database.  <h2>GET /api/v1/questions/:id/</h2>  This retrieves a particular question by ID from the database.  <h2>POST /api/v1/questions/</h2>  This adds a question to the database.  <h2>POST /api/v1/questions/:id/answers/</h2>  This adds an answer to a question.  <h2>GET /api/v1/questions/:id/answers/</h2>  This retrieves all answers for a question.";
  
  res.status(200).send(welcome);
});

// Start server
app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});

export default app;
