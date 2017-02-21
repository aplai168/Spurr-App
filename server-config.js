/* eslint no-multi-spaces: ["error", { exceptions: { "VariableDeclarator": true } }] */
const express        = require('express');
const morgan         = require('morgan');
const bodyParser     = require('body-parser');
const methodOverride = require('method-override');
// const router      = express.Router();
const mysql          = require('mysql');
const path           = require('path');
require('dotenv').config();

const app            = express();
// const HOST           = process.env.HOST;
// const USER           = process.env.USER;
// const PASSWORD       = process.env.PASSWORD;
// const DATABASE       = process.env.DB;
const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'spurr',
  // host: HOST,
  // user: USER,
  // password: PASSWORD,
  // database: DATABASE,
});

// Authentication ==========================================================
// app.use(cookieParser('shhhh, very secret'));
// app.use(session({
//   secret: 'shhh, it\'s a secret',
//   resave: false,
//   saveUninitialized: true
// }));

// middlewares ===================================================================

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/client')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
// app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request

dbConnection.connect((err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connection with mysql established');

});

// @input requests (array) : array of

// @result

const get = function get(reqs, table, db) {
  const req = reqs.join(',');
  const query = `SELECT ${req} FROM ${table}`;
  return db.query(query, (err, rows) => {
    if (!err) {
      console.log(rows);
    } else {
      console.log(err);
    }
  });
};

get(['username', 'user_id'], 'users', dbConnection);

// app.use(express.static(path.join(__dirname, './client/index.html')));


// Connecting to our models ======
// require('./models/prayerRequestModel.js'); // which executes 'mongoose.connect()'

module.exports = app;

// routes ======================================================================
// require('./app/routes.js')(app);