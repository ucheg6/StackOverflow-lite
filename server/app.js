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
app.use(express.static('UI'));

app.use('/api/v1', routes);


app.get('/api/v1', (req, res) => {
  const welcome = "<h1>Welcome to the StackOverflow-lite API Version 1.0</h1> <h2>navigate to https://stackoverflow-litee.herokuapp.com/apidoc to see api documentation </h2>";
  res.status(200).send(welcome);
});

app.get('/apidoc', (request, response) => {
  response.redirect('https://uchechukwuakogwu.docs.apiary.io');
});

app.get('*', (request, response) => {
  const error = {
    message: "I'm pretty sure this is not what you are looking for, please enter a valid route",
  };
  return response.status(404).json({
    message: error.message,
    status: 'error',
    
  });
});

// Start server
app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});

export default app;
