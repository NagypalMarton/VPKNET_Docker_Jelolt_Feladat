// Bejelentkezési oldal megjelenítése
exports.getLogin = (req, res) => {
  res.render('login');
};

// Bejelentkezési kérés kezelése
exports.postLogin = (req, res) => {
  const { neptun, password } = req.body;
  
  db.query('SELECT * FROM users WHERE neptun = ? AND password = ?', [neptun, password], (err, results) => {
    if (err) throw err;
    
    if (results.length > 0) {
      req.session.user = results[0];
      res.redirect('/');
    } else {
      res.render('login', { error: 'Érvénytelen Neptun kód vagy jelszó' });
    }
  });
};

// Regisztrációs oldal megjelenítése
exports.getRegister = (req, res) => {
  res.render('register');
};

// Regisztrációs kérés kezelése
exports.postRegister = (req, res) => {
  const { neptun, password, name, email } = req.body;
  
  db.query('INSERT INTO users (neptun, password, name, email) VALUES (?, ?, ?, ?)', [neptun, password, name, email], (err, results) => {
    if (err) throw err;
    
    req.session.user = { id: results.insertId, neptun, name, email };
    res.redirect('/');
  });
};
