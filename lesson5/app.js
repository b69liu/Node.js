var async = require('async');

var concurrencycount = 0;

/*fake a fetch function*/
var fetchUrl = function (url,callback){
	var delaytime = parseInt((Math.random() * 1000000) % 2000, 10);  //redix = decimal
    concurrencycount++;                                          //start fake connection
    console.log('current connection number is ', concurrencycount,
			'，now fatching is ', url, ', taking' + delaytime + 'ms');  
	setTimeout(
		function(){
        concurrencycount--;
	    callback(null, url + ' html content');                  //connection finished
	},delaytime);
}//end fetchUrl

/* vector of fake links */
var urls = [];
for(var i=0; i<30; i++){
	urls.push("www.fakegoogle.ca/" + i);
}

// ...or ES2017 async functions
async.mapLimit(urls, 5, function(url, callback) {
    fetchUrl(url,callback);
    
}, (err, results) => {
    if (err) console.err(err);;
    // results is now an array of the response bodies
    console.log("final:");
	console.log(results);
});
