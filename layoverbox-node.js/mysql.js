

/*var app = require('express')(); // Express App include
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data*/
var express = require('express'); // Express App include
var app = express();
var http = require('http').Server(app); // http server
var mysql = require('mysql'); // Mysql include
var bodyParser = require("body-parser"); // Body parser for fetch posted data
var connection = mysql.createConnection({ // Mysql Connection
    host : 'ubccapstone.cgwqxsrjl4uz.us-west-2.rds.amazonaws.com',
    user : 'EeceCapstone2015',
    password : 'UbcCapstone',
    database : 'Box'
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // Body parser use JSON data
app.use('/static',express.static('parse-js-blank'));

var getReq = '/recipients/:info';
app.get(getReq ,function(req,res){
var info = req.params.info;
    var data = {
        "error":1,
        "Box":""
    };
connection.query('SELECT * from recipients where package_password = ?', [info]  ,function(err, rows, fields){
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


app.get('/recipientsInfo/:info' ,function(req,res){
var info = req.params.info;
    var data = {
        "error":1,
        "Box":""
    };
connection.query('SELECT *  from recipients where hashtag = ?', [info]  ,function(err, rows, fields){
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

app.get('/boxinfo/size/:info' ,function(req,res){
var info = req.params.info;
    var data = {
        "error":1,
        "Box":""
    };
connection.query('SELECT *  from box where size =?',[info] ,function(err, rows, fields){
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

app.put('/recipients/boxid/:info/:number',function(req,res){
    var info = req.params.info;
    var number = req.params.number;
    var data = {
        "error":1,
        "Books":""
    };
        connection.query("UPDATE recipients SET box_id = ? where package_password = ? ",[number , info],function(err, rows, fields){
            if(!!err){
                data["Books"] = "Error Updating data";
            }else{
                data["error"] = 0;
                data["Books"] = "Updated Book Successfully";
            }
        });
    });

app.put('/recipients/password/:info/:number',function(req,res){
    var info = req.params.info;
    var number = req.params.number;
    var data = {
        "error":1,
        "Books":""
    };
        connection.query("UPDATE recipients SET package_password = ? where hashtag = ? ",[number , info],function(err, rows, fields){
            if(!!err){
                data["Books"] = "Error Updating data";
            }else{
                data["error"] = 0;
                data["Books"] = "Updated Book Successfully";
            }
        });
    });

app.put('/post/:info' , function(req,res){
    var info = req.params.info;
    var data = {
        "error":1,
        "Books":""
    };
        connection.query("UPDATE post SET small_cubby_available = small_cubby_available - 1 where campus_box_address_location = ? ",[info],function(err, rows, fields){
        console.log("getting nothing");    
	if(!!err){
                data["Books"] = "Error Updating data";
            }else{
                data["error"] = 0;
                data["Books"] = "Updated Book Successfully";
            }
        });
    });


app.put('/post/add/:info' , function(req,res){
    var info = req.params.info;
    var data = {
        "error":1,
        "Books":""
    };
        connection.query("UPDATE post SET small_cubby_available = small_cubby_available + 1 where campus_box_address_location = ? ",[info],function(err, rows, fields){
        console.log("getting nothing");    
	if(!!err){
                data["Books"] = "Error Updating data";
            }else{
                data["error"] = 0;
                data["Books"] = "Updated Book Successfully";
            }
        });
    });

app.get('/showall' ,function(req,res){
var info = req.params.info;
    var data = {
        "error":1,
        "Box":""
    };
connection.query('SELECT *  from recipients' ,function(err, rows, fields){
        console.log("getting something");
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


var getReq = '/userinfo/:info';
app.get(getReq ,function(req,res){
var info = req.params.info;
    var data = {
        "error":1,
        "Box":""
    };
connection.query('SELECT * from user_information where hashtag = ?', [info]  ,function(err, rows, fields){
        if(rows.length != 0){
            data["error"] = 0;
            data["Box"] = rows;
            res.json(data);
 console.log("getting something");
        }else{
            data["Box"] = 'No Box Found.. ';
            res.json(data);
        }
    });
});

var postReq = '/recipients/:email/:hashtag/:password';
app.post(postReq ,function(req,res){
var email = req.params.email;
var hashtag = req.params.hashtag;
var password = req.params.password;
    var data = {
        "error":1,
        "Box":""
    };
connection.query('INSERT INTO recipients(package_password,hashtag,email)VALUES(?,?,?)', [password,hashtag,email]  ,function(err, rows, fields){
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

app.get('/boxinfo' ,function(req,res){
var info = req.params.info;
    var data = {
        "error":1,
        "Box":""
    };
connection.query('SELECT *  from box',function(err, rows, fields){
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

//var getAddress = '/post/:info';
app.get('/post/' ,function(req,res){
var info = req.params.info;
    var data = {
        "error":1,
        "Box":""
    };
connection.query('SELECT *  from post' ,function(err, rows, fields){
        console.log("getting something");
	if(rows.length != 0){
            data["error"] = 0;
            data["Box"] = rows;
            res.json(data);
			console.log("getting something");
			
        }else{
            data["Box"] = 'No Box Found.. ';
            res.json(data);
			
        }
    });
});

var getPost =  '/postlistaddress/:Addr';
app.get(getPost ,function(req,res){
var Addr = req.params.Addr;
console.log(getPost);
    var data = {
        "error":1,
        "Box":""
    };
connection.query('SELECT id from post where id = ?', [Addr]  ,function(err, rows, fields){
		console.log("id is equal");
        if(rows.length != 0){
			console.log("status is ok");
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
