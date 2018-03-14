var mysql = require('mysql');

var connection = mysql.createConnection({
		host : 'localhost',
		user : 'calebliu',
		password : '123456',
		database : 'student'
});

connection.connect();

connection.query('SELECT Concat(name, \' is \',age,\' old\') as info FROM math where age < 100', function(err,results,fields){
		if(err){
		    console.log(err);
		}

		console.log("result:");
		results.forEach((entry)=>{
				console.log('Math student: '+ entry.info);
		});
});

connection.end();
