const { Pool } = require('pg'); // allows us not to open a client and close it every time we make a query

PG_URI =
  'postgres://zdvrmwet:mq-egMJFPkEN93ss8hPTTiSW6keADXad@lallah.db.elephantsql.com:5432/zdvrmwet';

const pool = new Pool({
  connectionString: PG_URI,
});

// ER: "users" table with the following columns:
// id INTEGER,
// date DATE,
// price INTEGER,
// name TEXT,
// overview TEXT,

//TEXT(size)	Holds a string with a maximum length of 65,535 bytes
//VARCHAR(255)

// INSERT INTO users (first_name, last_name, email, auth_token)
// VALUES ('first_name','last_name', 'email','auth_token' );

// CREATE TABLE favorites (
//   user_id int,
//   FOREIGN KEY (user_id) REFERENCES users (id),
// );

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    console.log('executed query', text);
    console.log('executed query', text);
    console.log('executed query', text);
    console.log('executed query', text);
    console.log('executed query', text);
    console.log('executed query', text);
    console.log('executed query', text);
    console.log('executed query', text);
    console.log('executed query', text);
    console.log('executed query', text);
    return pool.query(text, params, callback);
  },
};
