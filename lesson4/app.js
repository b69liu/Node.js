var ecentproxy = require('eventproxy');
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
			   topicUrls.push(href);
			}//end function 
		);//end $ toic
	    console.log(topicUrls);		
			
});//end sup
