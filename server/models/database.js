import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URL = {
  user: process.env.DB_USERNAME,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  max: 10,
  idleTimeoutMillis: 30000,
};

const DATABASE_URL_TEST = {
  user: process.env.DB_USERNAME_TEST,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE_TEST,
  password: process.env.DB_PASSWORD_TEST,
  port: process.env.DB_PORT,
 
};

let dbString = '';
if (process.env.NODE_ENV === 'production') dbString = DATABASE_URL
if (process.env.NODE_ENV === 'test') dbString = DATABASE_URL_TEST;
if (process.env.NODE_ENV === 'local') dbString = DATABASE_URL;

const pool = new pg.Pool(dbString);


pool.connect();

export default pool;