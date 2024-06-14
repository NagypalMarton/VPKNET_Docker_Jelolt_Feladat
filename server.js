const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();

// MySQL adatbázis kapcsolat beállítása
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'vpk_db'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});

// Middleware beállítások
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

// Statikus fájlok kiszolgálása
app.use(express.static(path.join(__dirname, 'public')));

// Nézet motor beállítása EJS-re
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Kezdőoldal
app.get('/', (req, res) => {
    res.render('index', { message: 'Üdvözöljük!' });
});

// Regisztrációs oldal
app.get('/register', (req, res) => {
    res.render('register');
});

app.post('/register', (req, res) => {
    const { neptun_code, password, name, email } = req.body;
    const query = 'INSERT INTO users (neptun_code, password, name, email) VALUES (?, ?, ?, ?)';
    db.query(query, [neptun_code, password, name, email], (err, results) => {
        if (err) {
            console.error(err);
            res.redirect('/register');
        } else {
            res.redirect('/login');
        }
    });
});

// Bejelentkezési oldal
app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    const { neptun_code, password } = req.body;
    const query = 'SELECT * FROM users WHERE neptun_code = ? AND password = ?';
    db.query(query, [neptun_code, password], (err, results) => {
        if (err || results.length === 0) {
            console.error(err);
            res.redirect('/login');
        } else {
            req.session.loggedin = true;
            req.session.neptun_code = neptun_code;
            res.redirect('/profile');
        }
    });
});

// Adatlap oldal
app.get('/profile', (req, res) => {
    if (req.session.loggedin) {
        const query = 'SELECT * FROM users WHERE neptun_code = ?';
        db.query(query, [req.session.neptun_code], (err, results) => {
            if (err) {
                console.error(err);
                res.redirect('/login');
            } else {
                const user = results[0];
                const deviceQuery = 'SELECT * FROM devices WHERE user_id = ?';
                db.query(deviceQuery, [user.id], (err, deviceResults) => {
                    if (err) {
                        console.error(err);
                        res.redirect('/login');
                    } else {
                        const device = deviceResults[0];
                        res.render('profile', { user, device });
                    }
                });
            }
        });
    } else {
        res.redirect('/login');
    }
});

app.post('/profile', (req, res) => {
    const { name, email, faculty, year, building, room_number, mac_address, host_name } = req.body;
    const userQuery = 'UPDATE users SET name = ?, email = ?, faculty = ?, year = ?, building = ?, room_number = ? WHERE neptun_code = ?';
    db.query(userQuery, [name, email, faculty, year, building, room_number, req.session.neptun_code], (err, results) => {
        if (err) {
            console.error(err);
            res.redirect('/profile');
        } else {
            const deviceQuery = 'UPDATE devices SET mac_address = ?, host_name = ? WHERE user_id = (SELECT id FROM users WHERE neptun_code = ?)';
            db.query(deviceQuery, [mac_address, host_name, req.session.neptun_code], (err, deviceResults) => {
                if (err) {
                    console.error(err);
                    res.redirect('/profile');
                } else {
                    res.redirect('/profile');
                }
            });
        }
    });
});


// Napi limit oldal
app.get('/limit', (req, res) => {
    const query = 'SELECT * FROM limits';
    db.query(query, (err, results) => {
        if (err) {
            console.error(err);
            res.redirect('/');
        } else {
            res.render('limit', { limits: results });
        }
    });
});

// Bejelentkezés kezelése
app.post('/login', (req, res) => {
    const { neptun_code, password } = req.body;
    // Ellenőrizzük az adatbázisban a felhasználót
    db.query('SELECT * FROM users WHERE neptun_code = ? AND password = ?', [neptun_code, password], (err, results) => {
        if (err) {
            res.send('Hiba történt');
            return;
        }
        if (results.length > 0) {
            req.session.user = results[0];
            res.redirect('/profile');
        } else {
            res.send('Hibás neptun kód vagy jelszó');
        }
    });
});

// Kijelentkezés
app.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
