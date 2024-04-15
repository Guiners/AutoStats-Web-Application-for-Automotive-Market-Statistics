const { Pool } = require('pg');

const pool = new Pool({
  user: 'master',
  host: '130.162.226.117',
  database: 'postgres',
  password: 'IsthataSupra1234',
  port: 5432,
});

export default pool;
