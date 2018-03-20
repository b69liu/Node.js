var express = require('express');
var fs = require('fs');

app = express();

/**
 * @api {get} /list_user Request All Users information
 * @apiName GetUser
 * @apiGroup User
 *
 * .
 *
 * @apiSuccess {String}  JSON_Map info of all Users.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "userNum": {"name":"Caleb","pw":"123","id":0}
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */


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
/**
 * @api {get} /titles Request All Movie titles
 * @apiName GetTitle
 * @apiGroup Movie
 *
 * .
 *
 * @apiSuccess {String}  JSON_Array list of all movie titles.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "Title": ["name":"Caleb","pw":"123","id":0]
 *     }
 *
 *
 */


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
/**
 * @api {get} /add_user Add a new tempated User
 * @apiName AddUser
 * @apiGroup User
 *
 */


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
/**
 * @api {get} /delete_user Delete a templated User
 * @apiName DeleteUser
 * @apiGroup User
 *
 * .
 *
 * @apiSuccess {String}  result informing the removal .
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "user deleted"
 *     }
 *
 *
 */


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
/**
 * @api {get} /search/:user_id Search user by user_id
 * @apiName SearchUser
 * @apiGroup User
 *
 * .
 *
 * @apiSuccess {String}  JSON_Map info of a user.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "name": "Caleb",
 *       "pw"  : "123",
 *       "id"  : 0
 *     }
 *
 * @apiError UserNotFound The id of the User was not found.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 404 Not Found
 *     {
 *       "error": "UserNotFound"
 *     }
 */


app.get('/search/:user_name',function(req,res){
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
