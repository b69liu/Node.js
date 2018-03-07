/** exec stored all out to a buffer and return it after the child done   */
/** So, it may not be a good idea for a child with huge amount of output */
const child_process = require('child_process');

for(var i=0; i<3; ++i){
    var workProcess = child_process.exec('node process_one.js '+ i, 
			function(err,stdout,stderr){
			    if(err){
				    console.log(err.stack);
					console.log('Error Code: '+err.code);
					console.log('Signal Received: '+err.singnal);

				}else{
				    console.log('stdout: '+ stdout);
					console.log('stderr: '+ stderr);

				}
	        }
	);

	workProcess.on('exit',code =>{ console.log('Process exit:'+code);});

}



