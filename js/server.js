var http = require('http');
var express = require('express');
var session = require('express-session');
var SessionStore = require('express-mysql-session')
var bodyParser = require('body-parser');
var Itunes = require('./Itunes');
var mysql = require('mysql');
var XMLHttpRequest = require('xhr2');
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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
  var password = req.body['pass'];
  connection.query('SELECT * FROM Users WHERE email = "'+email+'" AND password = "'+password+'"', function(err, rows) {
    if (rows.length == 1) {
      console.log("SERVER SIDE SUCCESS");
      res.send(JSON.stringify({"status": "success"}));
    } else {
      res.send(JSON.stringify({"status": "error"}));
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


var port = process.argv[2] || 8000;
app.listen(port);

console.log("listening on port " + port);