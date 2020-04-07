attributes  =  "Noah;22;MIS" ;
var pieces = attributes.split(';')
for(i=0; i<pieces.length; i++){
    console.log(pieces[i], typeof pieces[i]);
}
console.log(pieces.join('+')); 
