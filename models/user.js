// models/user.js

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username', // helyettesítsd a saját MySQL felhasználóneveddel
  password: 'password', // helyettesítsd a saját MySQL jelszavad
  database: 'user_management'
});

connection.connect();

exports.getUserByNeptun = (neptun, callback) => {
  const query = 'SELECT * FROM users WHERE neptun = ?';
  connection.query(query, [neptun], (err, results) => {
    if (err) {
      console.error('Hiba a lekérdezés során: ' + err.stack);
      return callback(err, null);
    }
    callback(null, results);
  });
};

exports.createUser = (user, callback) => {
  const { neptun, password, name, email } = user;
  const query = 'INSERT INTO users (neptun, password, name, email) VALUES (?, ?, ?, ?)';
  connection.query(query, [neptun, password, name, email], (err, results) => {
    if (err) {
      console.error('Hiba a felhasználó létrehozása során: ' + err.stack);
      return callback(err, null);
    }
    callback(null, results);
  });
};
