var age = 22;
var count = 0; 
while(count++ < age)
{
    if( (count > 0.5*age) && (count < 0.75*age))
    {
        console.log("No age zone!")
        continue;
    }
    console.log(count);
}
