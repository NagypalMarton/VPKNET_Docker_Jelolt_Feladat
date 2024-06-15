const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const layouts = require('express-ejs-layouts');
const app = express();

// Middleware konfigurálása
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(layouts);

// EJS beállítása
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Route-ok beállítása
const indexRouter = require('./routes/index');
app.use('/', indexRouter);

// Szerver indítása
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const db = require('./models');

db.sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Error synchronizing database:', err);
  });
