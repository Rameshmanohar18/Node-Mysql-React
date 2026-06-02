import mysql from "mysql2/promise";

const ConnectDB = async () => {
  const databaseName = process.env.DB_DATABASE || process.env.DB_NAME;

  const pool = await mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: databaseName,
    waitForConnections: process.env.DB_WAITFORCONNECTIONS,
    connectionLimit: process.env.DB_CONNECTIONLIMIT,
    queueLimit: process.env.DB_QUEUELIMIT
  });

  await pool.query(
    `CREATE DATABASE IF NOT EXISTS \`${databaseName}\``
  );
  console.log(`Database ${databaseName} created or already exists.`);


  await pool.query(`USE \`${databaseName}\``);
  console.log(`Switched to database ${databaseName}`);


  await pool.query(`CREATE TABLE IF NOT EXISTS \`${process.env.DB_TABLENAME}\` (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`);
  console.log(`${process.env.DB_TABLENAME} table created or already exists.`);
  return pool;
};

export default ConnectDB;
