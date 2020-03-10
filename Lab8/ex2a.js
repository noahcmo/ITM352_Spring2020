var age = 22;
var count = 1; 
while(count <= age)
{
    console.log(count++);
    if(count > 0.5*age)
    {
        console.log("I'm old!")
        break;
    }
}
