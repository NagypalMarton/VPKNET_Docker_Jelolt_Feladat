// controllers/authController.js

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'username', // helyettesítsd a saját MySQL felhasználóneveddel
  password: 'password', // helyettesítsd a saját MySQL jelszavad
  database: 'user_management'
});

connection.connect();

exports.getLogin = (req, res) => {
  res.render('login');
};

exports.postLogin = (req, res) => {
  const { neptun, password } = req.body;
  const query = 'SELECT * FROM users WHERE neptun = ? AND password = ?';
  connection.query(query, [neptun, password], (err, results) => {
    if (err) {
      console.error('Hiba a bejelentkezés során: ' + err.stack);
      return res.status(500).send('Hiba történt a bejelentkezés során.');
    }
    if (results.length > 0) {
      res.send('Sikeres bejelentkezés');
    } else {
      res.status(401).send('Érvénytelen Neptun kód vagy jelszó.');
    }
  });
};

exports.getRegister = (req, res) => {
  res.render('register');
};

exports.postRegister = (req, res) => {
  const { neptun, password, confirmPassword, name, email, acceptTerms } = req.body;
  if (password !== confirmPassword) {
    return res.status(400).send('A jelszavak nem egyeznek.');
  }
  if (!acceptTerms) {
    return res.status(400).send('El kell fogadni a Hálózati szabályzatot.');
  }
  const query = 'INSERT INTO users (neptun, password, name, email) VALUES (?, ?, ?, ?)';
  connection.query(query, [neptun, password, name, email], (err, results) => {
    if (err) {
      console.error('Hiba a regisztráció során: ' + err.stack);
      return res.status(500).send('Hiba történt a regisztráció során.');
    }
    res.redirect('/login');
  });
};
