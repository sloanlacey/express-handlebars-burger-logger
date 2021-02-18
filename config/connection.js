// Set up MySQL connection.
const mysql = require('mysql');
const util = require('util');

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'bees_make_honey',
  database: 'burgers_db'
});

// Make connection.
connection.connect(function(err) {
  if (err) throw err;
  console.log(`Connected as ID ${connection.threadId}`);
});

connection.query = util.promisify(connection.query);

// Export connection for our ORM to use.
module.exports = connection;