var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const session = require('express-session')
require('dotenv').config();

var indexRouter = require('./routes/index');
var proyectosRouter = require('./routes/proyectos');
var usuariosRouter = require('./routes/usuarios');
var loginRouter = require('./routes/usuarios_auth');
var registerRouter = require('./routes/usuarios_reg');

var app = express();

app.use(session({
  secret: process.env.TOKEN_KEY,
  resave: false,
  saveUninitialized: true
}))

var corsOptions = {
  origin: process.env.FRONTEND_DOMAIN, //Colocar dominio de Digital Ocean
  credentials: true
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set("view engine", "ejs")

//Middlewares.
app.use(cors(corsOptions))
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Routes
app.use('/', indexRouter);
app.use('/api/v1/proyectos', proyectosRouter);
app.use('/api/v1/usuarios', usuariosRouter);
app.use('/api/v1', loginRouter);
app.use('/api/v1/register', registerRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
