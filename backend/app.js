var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require('cors');
var api = require('./routes/cities');

var app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

if(process.env.SSL_ON == 'true') {
  app.all('*', (req, res, next) => {
    if(!req.hostname.match(/^www\..*/i)) {
      return res.redirect('https://www.' + req.hostname + req.url);
    }
    if(!req.secure) {
      return res.redirect('https://' + req.hostname + req.url);
    }
    next();
  });
}
app.use(cors());
app.use(express.static('../client/build'));
app.use(api);

app.use(function(req, res, next) {
  console.log('error');
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({ error: err })
});




module.exports = app;
