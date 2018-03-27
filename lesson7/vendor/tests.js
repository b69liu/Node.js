

var should = chai.should();
describe('base1 test', function(){
		it('should equal 0 when n === 0',function(){
				window.fibonacci(0).should.equal(0);
		});
});

describe('base2 test', function(){
		it('should equal 1 when n === 1',function(){
				window.fibonacci(1).should.equal(1);
		});
});

describe('simple test', function(){
		it('should equal 57 when n === 10',function(){
				window.fibonacci(10).should.equal(55);
		});
});
