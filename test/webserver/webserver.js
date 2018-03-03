var http = require('http');
var fs = require('fs');
var url = require('url');
var querystring = require('querystring');

http.createServer(function(request, response){
		var body = '';
		request.on('data',function(chunk){
				body += chunk;
		});

		request.on('end',function(){

			body =  querystring.parse(body);
	  	    var pathname = url.parse(request.url).pathname;

		    console.log("receive request "+ pathname.substr(1));

            fs.readFile(pathname.substr(1), function(err,data){
			    	if(err){
				       console.log(err);
				       response.writeHead(404,{'Content-Type':'text/html'});
			        }else{ 
				       response.writeHead(200,{'Content-Type':'text/html'});
					   if(body.firstname && body.lastname){
					       response.write('<h1>Hello '+body.firstname+' '+body.lastname + ' </h1>');
					   }else{
				           response.write(data);
					   }
				    }
				    response.end();
	    	});
		});

}).listen(8000);

console.log("Server is running at localhost:8000");
