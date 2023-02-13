import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { PG_HOST, STORE_DB, STORE_DB_TEST, PG_USER, PG_PASSWORD, ENV } =
  process.env;

console.log('env >>>>>>>>>>>>>>>>>', ENV);

const client: Pool =
  ENV === 'dev'
    ? new Pool({
        database: STORE_DB,
        host: PG_HOST,
        user: PG_USER,
        password: PG_PASSWORD,
      })
    : new Pool({
        database: STORE_DB_TEST,
        host: PG_HOST,
        user: PG_USER,
        password: PG_PASSWORD,
      });

export default client;
