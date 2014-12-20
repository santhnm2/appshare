var auth = require('./customAuth');
var http = require('http');
var express = require('express');
var session = require('express-session');
var SessionStore = require('express-mysql-session')
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Itunes = require('./Itunes');
var mysql = require('mysql');
var XMLHttpRequest = require('xhr2');
var passport = require('passport');
var expressSession = require('express-session');
var app = express();

app.use(cookieParser());
app.use(expressSession({
  secret:'somesecrettokenhere',
  resave: false,
  saveUninitialized: true
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get('/', function(req, res) {
  if (req.session.email) {
    res.sendFile('/search.html', { root: __dirname+'/../' });
  } else {
    res.sendFile('/index.html', { root: __dirname+'/../' });
  }
});

var connection = mysql.createConnection({
  host     : 'engr-cpanel-mysql.engr.illinois.edu',
  user     : 'rmukerj2_app',
  password : 'test1234'
});

connection.query('USE rmukerj2_appshare');

app.set('port', 3000);

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

app.post('/api/login', function(req, res) {
  var email = req.body['email'];
  var pass = req.body['pass'];
  connection.query('SELECT * FROM Users WHERE email = "'+email+'" AND password = "'+pass+'"', function(err, rows) {
    if (rows.length == 1) {
      req.session.email = email;
      res.send(JSON.stringify({"status": "success"}));
    } else {
      res.send(JSON.stringify({"status": "error"}));
    }
  });
});

app.post('/api/register', function(req, res) {
  var first = req.body['first'];
  var last = req.body['last'];
  var email = req.body['email'];
  var pass = req.body['pass'];
  connection.query('SELECT * FROM Users WHERE email = "'+email+'"', function(err, rows) {
    if (rows.length == 0) {
      var query = 'INSERT INTO Users (first, last, email, password, favorites) VALUES ("'+first+'", "'+last+'", "'+email+'", "'+pass+', "")';
      connection.query('INSERT INTO Users (first, last, email, password, favorites) VALUES ("'+first+'", "'+last+'", "'+email+'", "'+pass+'", "")', function(err, rows) {
        console.log('registration successful');
      });
      res.send(JSON.stringify({'status': 'success'}));
    } else {
      res.send(JSON.stringify({'status': 'error'}));
    }
  });
});

app.post('/api/itunes', function(req, res) {
	var searchTerm = req.body['searchTerm'];
	var URL = Itunes.getURL(searchTerm);
	xhr('GET', URL).success(function(data){
		res.json(data);
	});
});

app.post('/api/favorite', function(req, res) {
  var sess = req.session;
  if (!sess) {
    res.send(JSON.stringify({'status': 'error'}));
  } else {
    var email = sess.email;
    if (!email) {
      res.send(JSON.stringify({'status': 'error'}));
    } else {
      connection.query('SELECT favorites FROM Users WHERE email = "'+email+'"', function(err, rows) {
        var favorites = rows[0]['favorites'];
        favorites = favorites === '' ? req.body['appname'] : favorites + '%:%' + req.body['appname'];
        connection.query('UPDATE Users SET favorites = "'+favorites+'" WHERE email = "' + email + '"', function(err, rows) {
          console.log('set favorites');
        });
      });
      res.send({'status': 'success'});
    }  
  }  
});

app.get('/api/favorite', function(req, res) {
  var sess = req.session;
  if (!sess) {
    res.send(JSON.stringify({'status': 'error'}));
  } else {
    var email = sess.email;
    if (!email) {
      res.send(JSON.stringify({'status': 'error'}));
    } else {
      connection.query('SELECT favorites FROM Users WHERE email = "'+email+'"', function(err, rows) {
        var favorites = rows[0]['favorites'];
        res.send(JSON.stringify({'favorites': favorites}));
        });
      }
    }
});

var port = process.argv[2] || 8000;
app.listen(port);

console.log("listening on port " + port);