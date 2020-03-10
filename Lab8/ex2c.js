var age = 22;
var count = 0; 
while(count++ < age)
{
    if(count > 0.5*age)
    {
        console.log("Don't ask how old I am!")
        process.exit();
    }
    console.log(count);
}
