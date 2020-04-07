attributes  =  "Noah;22;MIS" ;
var pieces = attributes.split(';')
for(i=0; i<pieces.length; i++){
    console.log(pieces[i], typeof pieces[i]);
}
console.log(pieces.join('+')); 
console.log(pieces.join(';'))

pieces.forEach(printIt);
pieces.forEach(
    function(){console.log( (typeof item == 'string' && item.length > 0)?true:false )}
); 

function printIt(item,index){
    console.log(item, typeof item, isNonNegInt(item, true));
}

function isNotNegInt(q) {
    console.log('no')
}
isNotNegInt();
for (i=0; i < pieces.length; i++){
console.log(`${pieces[i]} isNotNegInt ${isNotNegInt(pieces[i], true)}`);
    }
console.log(pieces.join(';'))
    function isNotNegInt(q, returnErrors = false) // Collect validation errors in errors array and return value
    {
        errors = []; // assume no errors at first
    if(Number(q) != q) errors.push('Not a number!'); // Check if string is a number value
    if(q < 0) errors.push('Negative value!'); // Check if it is non-negative
    if(parseInt(q) != q) errors.push('Not an integer!'); // Check that it is an integer
    return returnErrors ? errors : (errors.length == 0);
    }
console.log(isNotNegInt(3));
    
    