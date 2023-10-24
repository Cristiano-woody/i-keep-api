export const config = () => ({
  dbHost: process.env.DB_HOST,
  dbPort: process.env.DB_PORT,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.Db_PASSWORD,
  DataBase: process.env.DATABASE,

  jwtSecretKey: process.env.JWT_SECRET_KEY
})