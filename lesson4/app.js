var eventproxy = require('eventproxy');
var superagent = require('superagent');
var cheerio = require('cheerio');
var url = require('url');

var cnodeUrl = 'https://cnodejs.org/';

superagent.get(cnodeUrl)
	.end(function(err, res){
		if(err){
		  return console.error(err);
		}//end if err
		var $ = cheerio.load(res.text);
		var topicUrls = [];
		$('#topic_list .topic_title').each(
			function(idx,element) {
			   var $element = $(element);
			   var href = url.resolve(cnodeUrl,$element.attr('href'));// '....org/' + 'topic/..'
			   if(idx >= 3) return false;
			      topicUrls.push(href);
			}//end function 
		);//end $ toic
	    console.log(topicUrls);

		//wait until all fatched
		var ep = new eventproxy();
		ep.after('got_file', 3 ,function (datas){
             datas = datas.map(function(pair){
				var Urlcontent = pair[0];
				var Htmlcontent= pair[1];
				var $ = cheerio.load(Htmlcontent);
				return({ //return an object
					title: $('.topic_full_title').text().trim(),
					href: Urlcontent,
					comment1: $('.reply_content').eq(0).text().trim()
				   	
				});//end return	 
			});//end map
            console.log('final:');
            console.log(datas);
				
		});//end ep.after
		
		//get data from each link with js method 'foreach'
        topicUrls.forEach(function (topicUrl){
			superagent.get(topicUrl)
			    .end(function(err,res){
					 if(err){
					    return console.error(err);
					 }//end if err
					 console.log('fetch ' + topicUrl + ' successful');
					 ep.emit('got_file', [topicUrl, res.text]);  //becomes 2d array
				})//end end
			
		});//end foreach
		
});//end sup
