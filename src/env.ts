import dotenv from 'dotenv';
dotenv.config();

export const env = {
  server: {
    port: Number(process.env.SERVER_PORT) || 3000,
  },
  google: {
    apiKey: process.env.GOOGLE_API_KEY || '',
  },
  db: {
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3306,
    name: process.env.DB_DATABASE || 'urban',
    username: process.env.DB_USER || 'mysql',
    password: process.env.DB_PASSWORD || 'mysql',
  },
};
