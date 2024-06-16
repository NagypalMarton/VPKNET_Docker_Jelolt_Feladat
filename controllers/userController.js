// controllers/userController.js
const connection = require('../models/userModel');

exports.getUsers = (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.render('index', { users: results });
  });
};
