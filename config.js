import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const dialect = process.env.DB_DIALECT || "sqlite";

/* Sequelize constructor arguments:
   - database name
   - username
   - password
   - options (host, port, dialect, storage, logging)
   For sqlite the `storage` option points to a file path.
*/
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.USER,
  process.env.PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.PORT,
    dialect,
    storage: dialect === 'sqlite' ? process.env.DB_STORAGE : undefined,
    logging: false, // disable SQL query logging by default
  }
);

export default sequelize;