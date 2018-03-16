const superagent = require('superagent');



superagent.get('127.0.0.1:8000/titles')
	.query({ api_key: 'Calebskey', date: '2018-03-16' })
	.end((err,res)=>{
        if(err){
		     console.log(err.message);
		}
		console.log(JSON.parse(res.text).Title.sort());
});
