
var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data
var connection = mysql.createConnection({ // Mysql Connection
    host : 'localhost',
    user : 'root',
    password : 'bnm85250321',
    database : 'clients',
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data

var getReq = '/recipients/:info';
app.get(getReq ,function(req,res){
var info = req.params.info;
console.log(getReq);
    var data = {
        "error":1,
        "Box":""
    };
connection.query('SELECT boxid from recipients where hashtag = ?', [info]  ,function(err, rows, fields){
        if(rows.length != 0){
            data["error"] = 0;
            data["Box"] = rows;
            res.json(data);
        }else{
            data["Box"] = 'No Box Found.. ';
            res.json(data);
        }
    });
});

var getPost =  '/post/:Addr';
app.get(getPost ,function(req,res){
var Addr = req.params.Addr;
console.log(getPost);
    var data = {
        "error":1,
        "Box":""
    };
connection.query('SELECT SmallCubbyAvaiable from post where LayoverBoxAddress = ?', [Addr]  ,function(err, rows, fields){
        if(rows.length != 0){
            data["error"] = 0;
            data["Box"] = rows;
            res.json(data);
        }else{
            data["Box"] = 'No Box Found.. ';
            res.json(data);
        }
    });
});

app.listen(3000);
