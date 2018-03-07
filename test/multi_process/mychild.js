var myName = process.argv[2];
process.on('message',function(msg){
		console.log("Hello, %s! I am your child, %s",msg.message, myName);
});

process.send({ message: myName});
