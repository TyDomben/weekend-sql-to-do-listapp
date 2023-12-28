const pg = require("pg");
let pool;
let databaseName = "weekend-to-do-app";
// When our app is deployed to the internet
// we'll use the DATABASE_URL environment variable
// to set the connection info: web address, username/password, db name
// eg:
//  DATABASE_URL=postgresql://jDoe354:secretPw123@some.db.com/prime_app
if (process.env.DATABASE_URL) {
  pool = new pg.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  if (process.env.NODE_ENV === "test") {
    databaseName = "prime_testing";
  }

  pool = new pg.Pool({
    host: "localhost",
    port: 5432,
    database: databaseName,
    allowExitOnIdle: true,
  });
}
module.exports = pool;
