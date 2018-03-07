const child_process = require('child_process');

for(var i=0; i<3; ++i){
    var workProcess = child_process.spawn('node', ['process_one.js',i]);

	workProcess.stdout.on('data',data =>{ console.log('stdout:'+data);});
	workProcess.stderr.on('data',data =>{ console.log('stderr:'+data);});

	workProcess.on('close',code =>{ console.log('Process exit:'+code);});

}



