var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded({ extended: false }) //use querystring

app.use(express.static('public'));


app.get('/',function(req,res){
		console.log('get /');
		//res.send('hello world');
		res.sendFile(path.join(__dirname + '/index.html'));
});



app.get('/list_usr',function(req,res){
		console.log('get list');
		res.send('user list');
});


app.post('/',urlencodedParser, function(req,res){
		console.log('post');
		if(!req.body) return res.sendStatus(400);
		res.send('welcome ' + req.body.first_name);
});


var server = app.listen(8000,"127.0.0.1", function(){
        var host = server.address().address;
		var port = server.address().port;
		console.log("listening to http://%s:%s",host,port);
});

