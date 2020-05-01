/*Got isNonNegInt function from Lab13*/
function isNonNegInt(q, return_errors = false) {
  errors = []; // assume no errors at first
  if (q == '') q = 0; // handle blank inputs as if they are 0
  if (Number(q) != q) errors.push('<font color="red">Not a number!</font>'); // Check if string is a number value
  if (q < 0) errors.push('<font color="red">Negative value!</font>'); // Check if it is non-negative
  if (parseInt(q) != q) errors.push('<font color="red">Not an integer!</font>'); // Check that it is an integer
  return return_errors ? errors : (errors.length == 0);
}
/*Generates server using express*/
var express = require('express');
var app = express();
var myParser = require("body-parser");
var fs = require('fs');
/*Links server to use the data from product_data.js*/
var data = require('./public/product_data.js');
var products = data.products;

app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});

app.use(myParser.urlencoded({ extended: true }));

/*Gets data from the body; uses quantity_form in index.html and uses action "process_form"*/
app.post("/process_form", function (request, response) {
  let POST = request.body;

  if (typeof POST['purchase_submit'] != 'undefined') {
    /*Validates the quantites*/
    var isvalid = true;
    for (i = 0; i < products.length; i++) {
      q = POST["quantity" + i];
      isvalid = isvalid && isNonNegInt(q);
    }

    /*If quantities are valid, generate the invoice.*/
    /* Retrieved invoice table layout from Invoice WOD */
    if (isvalid) {
      str = `
      <body>
      <form action="/check_login?quantity=999" method="POST">
      <input type="text" name="username" size="40" placeholder="enter username" ><br />
      <input type="password" name="password" size="40" placeholder="enter password"><br />
      <input type="submit" value="Submit" id="submit">
      </form>
      <a href = "./register">New User Register</a>
      </body>
          `;
          app.post("/check_login", function (request, response) {
            // Process login form POST and redirect to logged in page if ok, back to login page if not
            console.log(request.query);
            var err_str = "";
            var login_username = request.body["username"];
            //Check if username exits in reg data. If so, check if password matches
            if (typeof userdata[login_username] != 'undefined') {
                var user_info = userdata[login_username];
                // Check if password stored for username matches what user typed in
                if (user_info["password"] != request.body["password"]) {
                    err_str = `bad_password`;
                } else {
                    response.end(`${login_username} is logged in with data ${JSON.stringify(request.query)}`);
                    return;
                }
        
            } else {
                err_str = `bad_username`;
            }
            response.redirect(`./login?username} = ${login_username} &error = ${err_str}`);
        });
      /*var htmlstr = `
      <link rel="stylesheet" href="./invoice_style.css"></link>
      <table border="2">
    <tbody><tr>
    <th style="text-align: center;" width="43%">Item</th>
    <th style="text-align: center;" width="11%">quantity</th>
    <th style="text-align: center;" width="13%">price</th>
    <th style="text-align: center;" width="54%">extended price</th>
  </tr>`;*/
      var extended_price;
      var subtotal = 0;

      for (i = 0; i < products.length; i++) {

        q = POST["quantity" + i];
        // Product rows
        extended_price = products[i].price * q;
        subtotal = extended_price + subtotal;
        htmlstr += `
              <tr>
                <td width="43%">${products[i].model}</td>
                <td align="center" width="11%">${q}</td>
                <td width="13%">\$${products[i].price}</td>
                <td width="54%">\$${extended_price}</td>
              </tr>
          `;
      }
      /* End of rows loop */
      /* Compute Tax */
      var tax_rate = 0.0416;
      var tax = tax_rate * subtotal;
      /* Compute Shipping */
      if (subtotal < 100) { shipping = 4 }
      else if (subtotal < 200) { shipping = 7 }
      else if (subtotal > 200) { shipping = 10 };

      var total = subtotal + tax + shipping;
/* Used .toFixed(2) to fix decimal places to two */
      htmlstr += `
      <tr>
      <td colspan="4" width="100%">&nbsp;</td>
    </tr>
    <tr>
      <td style="text-align: center;" colspan="3" width="67%">Sub-total</td>
      <td width="54%">$${subtotal.toFixed(2)}</td>
    </tr>
    <tr>
      <td style="text-align: center;" colspan="3" width="67%"><span style="font-family: arial;">Tax @ 4.167%</span></td>
      <td width="54%">$${tax.toFixed(2)}</td>
    </tr>
    <tr>
      <td style="text-align: center;" colspan="3" width="67%"><span style="font-family: arial;">Shipping</span></td>
      <td width="54%">$${shipping.toFixed(2)}</td>
    </tr>
    <tr>
      <td style="text-align: center;" colspan="3" width="67%"><strong>Total</strong></td>
      <td width="54%"><strong>$${total.toFixed(2)}</strong></td>
    </tr>
    </tbody>
     </table>
     <p>
     Shipping Policy: A subtotal of less than $100 will amount to a shipping charge of $4. If your subtotal is over $100 yet under $200, the shipping charge will be adjusted to $7. If your subtotal is over $200, you will be charged with a shipping price of $10.
     </p>
     `;
      response.send(htmlstr);
    }
    /* Else deny the request with "Sorry! At least one of your quantities is not valid... */
    else {
      response.send("Sorry! At least one of your quantities is not valid. Please enter a valid quantity and try again!");
    }
  }



});
/* Got from Lab13; tells server to use public file*/ 
app.use(express.static('./public'));
/*Tells server to run on port8080 */
app.listen(8080, () => console.log(`connected to port 8080`));