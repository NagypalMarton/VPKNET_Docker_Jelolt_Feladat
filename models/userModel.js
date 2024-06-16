// models/userModel.js
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'testuser',
  password: 'testpassword',
  database: 'mydatabase'
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Connected to the database!');
});

module.exports = connection;
