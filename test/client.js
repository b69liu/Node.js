var http = require('http');

var option = {
      host: 'localhost',
	  port: '8000',
	  path: '/myPage.html'
};


var req = http.request(option, function(response){
	var body = '';
	response.on('data', function(data){
			body += data;
	});

	response.on('end', function(){
			//print the received page
			console.log(body);
	});
});

//send data and terminate connection
req.end();
		
