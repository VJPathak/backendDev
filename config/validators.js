//phno length validator
function validateLength(value, minLength, maxLength) {
    if (typeof value !== 'string') {
      throw new Error('Input must be a string');
    }
    if(value.length<10){
        return 0;
    }
  }
  
module.exports ={validateLength}