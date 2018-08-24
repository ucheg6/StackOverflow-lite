import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import routes from './routes';


const app = express();

const port = process.env.PORT || 5000;

app.use(logger('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/v1', routes);

app.get('/', (req, res) => (
  res.status(200).json({
    message: 'Welcome to StackOverflow-lite',
  })
));

// Start server
app.listen(port, () => {
  console.log(`Express server listening on ${port}`);
});

export default app;
