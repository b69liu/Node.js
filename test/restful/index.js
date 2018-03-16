var express = require('express');
var fs = require('fs');

app = express();


/** list all user info in json*/
app.get('/list_user',function(req,res){
		var resContent = '';
		fs.readFile(__dirname + '/usr.json','utf8', function(err,data){
				if(err){
				    console.log(err);
				}else{
                    resContent += data;
					res.end(resContent);
				}
				
		});
});

app.get('/titles',function(req,res){
		var resContent = '';
		fs.readFile(__dirname + '/movie.json','utf8', function(err,data){
				if(err){
				    console.log(err);
				}else{
                    resContent += data;
					res.end(resContent);
				}
				
		});
});


/** templated user to add*/
user = { 'usernew':{
	   'name':'newone',
	   'pw': '0',
	   'id': 3
   }
};

/** add the templated user */
app.get('/add_user',function(req,res){
		var resContent = '';
		fs.readFile(__dirname + '/usr.json','utf8' ,function(err,data){
				if(err){
				    console.log(err);
				}else{
                    data = JSON.parse(data);
					data['usernew'] = user['usernew'];
					fs.writeFile(__dirname + '/usr.json', JSON.stringify(data), (err) => {if(err){console.log(err);}});
				    console.log('file upgraded');
					res.end('record added successfully');
				}
				
		});
});

/** delete the templated user */
app.get('/delete_user',function(req,res){
		var resContent = '';
		fs.readFile(__dirname + '/usr.json','utf8' ,function(err,data){
				if(err){
				    console.log(err);
				}else{
                    data = JSON.parse(data);
					delete data['usernew'];
					fs.writeFile(__dirname + '/usr.json', JSON.stringify(data), (err) => {if(err){console.log(err);}});
				    console.log('file upgraded');
					res.end('user deleted');
				}
				
		});
});

app.get('/:user_name',function(req,res){
		var resContent = '';
		fs.readFile(__dirname + '/usr.json','utf8' ,function(err,data){
				if(err){
				    console.log(err);
				}else{
                    data = JSON.parse(data);
				    console.log('get user info');
					res.end(JSON.stringify(data[req.params.user_name]));
				}
				
		});
});



var server = app.listen(8000,"localhost", function(){
		var host = server.address().address;
		var port = server.address().port;
		console.log("listening %s:%s",host,port);
});
