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
		var result;
		var ep = new eventproxy();
		ep.after('got_file', 3 ,function (datas){
             result = datas.map(function(pair){
				var Urlcontent = pair[0];
				var Htmlcontent= pair[1];
				var $ = cheerio.load(Htmlcontent);
				var newhref = $('.reply_author').eq(0).attr('href'); //comment author's page
				newhref = url.resolve(cnodeUrl, newhref);
				

                var tit = $('.topic_full_title').text().trim();
				var comt1 = $('.reply_content').eq(0).text().trim();
				var aut =  $('.reply_author').eq(0).text();
				var sc;
				/*get score*/
				return({ //return an object
					title: tit,
					href: Urlcontent,
					comment1: comt1,
					author: aut,
                    score1: newhref
				   	
				});//end return	 
			});//end map
            console.log('final:');
            console.log(result[0].score1);
			
			result.forEach(function (entry){   //a entry is a obj including 5 fields
					superagent.get(entry.score1)
					   .end(function (err2, res2){
					       if (err2) {
						      return console.error(err2);;
						   }//end if err2
						   console.log('fetch comment score successful');
						   var $ = cheerio.load(res2.text);
						   entry.score1 = $("span.big").eq(1).text();
						   console.log(entry);
					   })//end end
			})//end rtforeach
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
