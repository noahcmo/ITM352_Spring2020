function isNonNegInt(q, return_errors = false) {
  errors = []; // assume no errors at first
  if (q == '') q = 0; // handle blank inputs as if they are 0
  if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
  if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
  if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
  return return_errors ? errors : (errors.length == 0);
}

let products_array = require('./shoes.json'); //Got from Assignment 1
/*Used similar server to Lab13*/
var express = require('express');
var app = express();
var myParser = require("body-parser"); 
var fs = require('fs');
/*From Lab13*/
var data = require('./public/product_data.js');
var products = data.products;

app.all('*', function (request, response, next) {
    console.log(request.method + ' to ' + request.path);
    next(); 
});

app.use(myParser.urlencoded({ extended: true })); 

app.post("/quantity_form", function (request, response) {
   let POST = request.body;
   q = POST["quantity_textbox"]; 

    if (typeof POST['quantity_textbox'] != 'undefined') {
      console.log(q);
    if(isNonNegInt(q, false)) {
      response.send(`Thank you for purchasing ${q} things!`);
      }
    else{
         response.send(`${q} is not a quantity! Press the back button and try again.`); 
      }
  };
});


app.listen(8080, () => console.log(`connected to port 8080`));


/*Made tax rates up */
tax_rate = 0.045;
tax = tax_rate + subtotal;

/*Did on my own */
if (subtotal < 100)
     {shipping = 4}
     else if (subtotal < 100)
     {shipping = 7}
     else if (subtotal > 100)
     {shipping = 0.07*subtotal}

     total = subtotal + tax + shipping; 
/*Got table row code from Invoice WOD */
     <tr>
            <td width="43%">${item2}</td>
            <td align="center" width="11%">${quantity2}</td>
            <td width="13%">\$${price2}</td>
            <td width="54%">\$${extended_price}</td>
          </tr>