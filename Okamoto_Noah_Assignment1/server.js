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

app.use(myParser.urlencoded({ extended: true })); //gets data from body

app.post("/process_form", function (request, response) {
  let POST = request.body;

  if (typeof POST['purchase_submit'] != 'undefined') {
    for (i = 0; i < products.length; i++) {

      q = POST["quantity" + i];

      console.log(q);
      if (isNonNegInt(q, false)) {
        console.log(`Thank you for purchasing ${q} things!`);
      }
      else {
        console.log(`${q} is not a quantity! Press the back button and try again.`);
      }
    }
  }
  response.send("Thank you for your purchase! Have a great day!");
});
app.get("process_invoice", function (request, response) {
  if (isNonNegInt(q, false)) {

  }
});
//If quantity is all good, process invoice. not good, send back to page 
app.use(express.static('./public'));
app.listen(8080, () => console.log(`connected to port 8080`));