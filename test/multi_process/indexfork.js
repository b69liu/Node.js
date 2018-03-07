/** fork is similar to spawn but has channel btw parent and child */
const child_process = require('child_process');

var myName = process.argv[2];
var child = child_process.fork('./mychild.js',['Kiven']);

child.on('message',(msg)=>{console.log("Hi, %s! I am your Dad, %s.",msg.message,myName)});

child.send({message:myName});

