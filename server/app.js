const express = require('express');
const cors = require('cors');
const session = require('express-session');
const auth_route = require('./middleware/routes/auth');

const app = express();

// Global variables
storage = null;

app.use(cors())
app.use(session({
  secret: 'ssshhhhh',
  resave: true,
  saveUninitialized: true,
}))
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(auth_route)

app.listen(8080)
