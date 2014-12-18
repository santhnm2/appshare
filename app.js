var express = require('express');
var path = require('path');
var mysql = require('mysql');
var http = require('http');
var bodyParser = require('body-parser');
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))


var connection = mysql.createConnection({
  host     : 'engr-cpanel-mysql.engr.illinois.edu',
  user     : 'rmukerj2_app',
  password : 'test1234'
});

connection.query('USE rmukerj2_appshare');

app.set('port', 3000);
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'jade');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
        extended:true
}));
app.use('/', express.static(__dirname));

app.get('/api/select', function(req, res){
  console.log("about to query");
  connection.query('SELECT * FROM Users', function(err, rows){
    //res.render('users', {users : rows});
    res.send(JSON.stringify(rows));
  });
  console.log("after query");
});

app.post('/api/register', function(req, res){
    var first = req.body["infor[]"][0];
    var last = req.body["infor[]"][1];
    var email = req.body["infor[]"][2];
    var password = req.body["infor[]"][3];
  connection.query('INSERT INTO Users (first, last, email, password) VALUES ("'+first+'", "'+last+'", "'+email+'", "'+password+'")', function(err, rows){
        //do some error checking
  });
});

app.post('/api/sign_in', function(req, res){
    var email = req.body["infor[]"][0];
    var password = req.body["infor[]"][1];
    console.log(email);
    console.log(password);
    connection.query('SELECT * FROM Users WHERE email = "'+email+'" AND password = "'+password+'"', function(err, rows){
        console.log("gets here");
        res.json(rows);
  });
});

app.listen(app.get('port'));
console.log('Express server listening on port ' + app.get('port'));