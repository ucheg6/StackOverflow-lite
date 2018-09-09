import pool from './database';
import query from './seed';

pool.query(query)
  .then(() => process.exit())
.catch(error => console.log(error.stack));