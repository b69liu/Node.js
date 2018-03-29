var app = require('../app');
var supertest = require('supertest');
var request = supertest.agent(app);  //supertest.(app); not recording cookie
var should = require('should');


testhp = function (  num, ans,done){
	request.get('/fib').query({n: num})
		.end(function(err,res){
				res.text.should.equal(ans);
				done(err);
		});

};

testHp = function(info,num,ans){
       it(info,function(done){
				request.get('/fib').query({n: num})
				.end(function(err,res){
						res.text.should.equal(ans);
						done(err);
				});
				    
		});
}


describe('test/app.test.js',function(){
		it('should return 55 when n is 10',function(done){
				request.get('/fib').query({n: 10})
				.end(function(err,res){
						res.text.should.equal('55');
						done(err);
				});
				    
		});

	    it('should return 0 when n === 0',function(done){
				testhp(0,'0',done);
		});

        testHp('should equal 1 when n === 1',1,'1');		

        testHp('should equal 55 when n === 10',10,'55');
        testHp('should throw when n > 10',100,'n should <= 10');
        testHp('should throw when n < 0',-1,'n should >= 0');
        testHp('should throw when n is not Number', 'NonNumber','n should be a Number');

        it('should return status 500 when error', function(done){
				request.get('/fib').expect(500)
				.end((err,res)=>{
						done(err);
				});
		});

});


