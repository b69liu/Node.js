var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');


var urlencodedParser = bodyParser.urlencoded({ extended: false }) //use querystring
var upload = multer({dest:'/temp/'});

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

app.post('/file_upload', upload.array('image'), function(req,res){
		console.log('uploading file:');
		console.log(req.files[0]);
		var des_file = __dirname + '/' + req.files[0].originalname;
		fs.readFile(req.files[0].path, function(err,data){
				if(err){
				    console.log(err);
				}else{
				    fs.writeFile(des_file,data,function(err){
							if(err){
							    console.log(err);
							}else{
							   // res.write('file: '+req.files[0].originalname+ ' uploaded');

							}

					});
				}
		});
		res.end('file: '+req.files[0].originalname+ ' uploaded');
		
});


var server = app.listen(8000,"127.0.0.1", function(){
        var host = server.address().address;
		var port = server.address().port;
		console.log("listening to http://%s:%s",host,port);
});

