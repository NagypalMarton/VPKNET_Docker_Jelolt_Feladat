// controllers/userController.js
const connection = require('../models/userModel');
const ejs = require('ejs');

exports.getUsers = (req, res) => {
  connection.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    ejs.renderFile('views/index.ejs', { users: results }, (err, html) => {
      if (err) throw err;
      res.render('main', { 
        title: 'User List',
        body: html
      });
    });
  });
};

// Assuming you have a controller function for the new user page
exports.newUserForm = (req, res) => {
  ejs.renderFile('views/newUser.ejs', {}, (err, html) => {
    if (err) throw err;
    res.render('main', { 
      title: 'Add New User',
      body: html 
    });
  });
};
