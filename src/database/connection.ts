import pg from 'pg';

const Pool = pg.Pool;
const pool = new Pool({
  user: 'postgres',
  password: 'postgres',
  host: 'localhost',
  database: 'ProjetoAcademicoWeb',
  port: 5432,
});

export default pool;
