const config = {
  development: {
    user: "app_user",
    host: "localhost",
    database: "final_project",
    password: "password",
    port: 5432
  },
  production: {
    connectionString: process.env.DATABASE_URL
  }
};

const env = process.env.NODE_ENV || "development";

module.exports = config[env];
