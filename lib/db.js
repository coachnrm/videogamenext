import sql from 'mssql';

// SQL Server Configuration
const config = {
  user: 'sa',
  password: 'reallyStrongPwd123',
  server: 'localhost,1433', // e.g., 'localhost' or an IP address
  database: 'VideoGameDb',
  options: {
    encrypt: true, // Use encryption for Azure
    trustServerCertificate: true, // Needed for self-signed certificates
  },
};

// Create a connection pool
let pool;

export const getConnection = async () => {
  if (!pool) {
    pool = await sql.connect(config);
  }
  return pool;
};

export default sql;
