const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const session = require('express-session');
const app = express();

// Importáljuk a kontrollereket
const authController = require('./controllers/authController');
const userController = require('./controllers/userController');

// Middleware beállítása
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main'); // A layout fájl megadása

// Session beállítása
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: true
}));

// Útvonalak definiálása
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);

app.get('/register', authController.getRegister);
app.post('/register', authController.postRegister);

// Bejelentkezés utáni útvonalak
app.get('/profile', userController.getProfile);
app.get('/daily-limit', userController.getDailyLimit);
app.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

// Szerver indítása
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen`);
});
