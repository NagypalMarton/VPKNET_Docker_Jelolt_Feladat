const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();

// Importáljuk a kontrollereket
const authController = require('./controllers/authController');

// Middleware beállítása
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.set('layout', 'layouts/main'); // A layout fájl megadása

// Útvonalak definiálása
app.get('/', (req, res) => {
  res.render('index');
});

app.get('/login', authController.getLogin);
app.post('/login', authController.postLogin);

app.get('/register', authController.getRegister);
app.post('/register', authController.postRegister);

// Szerver indítása
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:${port} címen`);
});
