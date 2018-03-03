//All examples: https://github.com/cnodejs/nodeclub/blob/master/test/controllers/topic.test.js
//API https://github.com/tj/should.js

//import file
var main = require('../main');
var should = require('should');

describe('test/main.test.js', function () {                     //remember it
      //base case
	  it('should equal 0 when n === 0', function () {
            main.fibonacci(0).should.equal(0);   //shoud is a field added to the base class
      });//end it
	  it('should equal 1 when n === 1', function () {
            main.fibonacci(1).should.equal(1); 
      });//end it
      //mode cases
	  it('should equal 55 when n === 10', function () {
            main.fibonacci(10).should.equal(55); 
      });//end it
	  it('should throw when n > 10', function () {
            (function (){main.fibonacci(11)}).should.throw('n should <= 10'); 
      });//end it
	  it('should throw when n < 0', function () {
             (function (){main.fibonacci(-1)}).should.throw('n should >= 0');
	  });//end it
	  it('should throw when n is not a number', function () {
             (function (){main.fibonacci('hi')}).should.throw('n should be a Number'); 
      });//end it
	
	  });//end of des
