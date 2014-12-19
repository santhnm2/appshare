var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var Itunes = require('./Itunes');
var XMLHttpRequest = require('xhr2');
//var xhr = require('./xhr');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

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
  var test = "force commit";
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

function reqListener() {
	//console.log(this.responseText);
	//console.log("successful search");
}

app.post('/api/itunes', function(req, res) {
	var searchTerm = req.body['searchTerm'];
	var URL = Itunes.getURL(searchTerm);
	console.log('test');
	xhr('GET', URL).success(function(data){
		// console.log(data);
		res.json(data);
	});
});

var port = process.argv[2] || 8000;
app.listen(port);

console.log("listening on port " + port);