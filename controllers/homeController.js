const db = require('../models');

exports.index = async (req, res) => {
  try {
    const users = await db.User.findAll();
    res.render('home', { users });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
