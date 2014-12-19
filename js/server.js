var http = require('http');
var express = require('express');
var session = require('express-session');
var SessionStore = require('express-mysql-session')
var bodyParser = require('body-parser');
var Itunes = require('./Itunes');
var XMLHttpRequest = require('xhr2');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// var options = {
//     host: 'engr-cpanel-mysql.engr.illinois.edu',
//     port: 3306,
//     user: 'rmukerj2_app',
//     password: 'test1234',
//     database: 'rmukerj2_appshare'
// }

// var sessionStore = new SessionStore(options);

// app.use(session({
//     key: 'session_cookie_name',
//     secret: 'session_cookie_secret',
//     store: sessionStore,
//     resave: true,
//     saveUninitialized: true
// }));

// var sess;

function parseIfJSON(data) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return data;
  }
}

function xhr(type, url, data) {
  var callbacks = {
    success: [],
    error: []
  };

  var request = new XMLHttpRequest();

  request.open(type, url, true);
  request.setRequestHeader(
    'Content-type',
    'application/json'
  );

  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      var invokeCallback = function(callback) {
        callback.call(undefined, parseIfJSON(request.responseText), request);
      };

      if (request.status > 99 && request.status < 400) {
        callbacks.success.forEach(invokeCallback);
      } else {
        callbacks.error.forEach(invokeCallback);
      }
    }
  };

  request.send(JSON.stringify(data));

  return {
    success: function(callback) {
      callbacks.success.push(callback);
    },
    error: function(callback) {
      callbacks.error.push(callback);
    }
  }
}

app.use('/', express.static(__dirname+'/../'));

// app.get('/', function(req, res){
//   sess = req.session;
//   if(sess.email) {
//     console.log("Should go to search.html");
//     res.redirect('search.html');
//   } else {
//     res.render('index.html');
//   }
// })

app.post('/api/login', function(req, res) {
  sess = req.session;
  sess.email = req.body.email;
  res.end('done');
});

app.post('/api/itunes', function(req, res) {
	var searchTerm = req.body['searchTerm'];
	var URL = Itunes.getURL(searchTerm);
	xhr('GET', URL).success(function(data){
		res.json(data);
	});
});


var port = process.argv[2] || 8000;
app.listen(port);

console.log("listening on port " + port);