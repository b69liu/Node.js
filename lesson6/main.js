//*******************************************************
// This is the program to be tested
//*******************************************************

var fibonacci = function (n) {
  if(typeof n !== 'number'){
     throw Error('n should be a Number');
  }
  if(n < 0){
     throw Error('n should >= 0');
  }
  if(n >10){
     throw Error('n should <= 10');
  }
  if (n === 0) {
    return 0;
  }
  if (n === 1) {
    return 1;
  }
  return fibonacci(n-1) + fibonacci(n-2);
};


// Not excute if required by other file
if (require.main === module) {
   var n = Number(process.argv[2]);
   console.log('fibonacci(' + n + ') is', fibonacci(n));
}


exports.fibonacci = fibonacci; // export the function
