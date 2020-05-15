
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
var user_info_file = './user_data.json';
const qs = require("querystring");

var cookieParser = require('cookie-parser');
app.use(cookieParser());
var session = require('express-session');
app.use(session({secret: "ITM352 rocks!"}));

if (fs.existsSync(user_info_file)) {
  var file_stats = fs.statSync(user_info_file);

  var data = fs.readFileSync('./user_data.json', 'utf-8');
  var userdata = JSON.parse(data);

  console.log(`${user_info_file} has ${file_stats.size} characters`);

} else {
  console.log("hey!" + user_info_file + "doesn't exist!")
}

app.all('*', function (request, response, next) {
  console.log(request.method + ' to ' + request.path);
  next();
});

app.use(myParser.urlencoded({ extended: true }));

//add a route to get a cookie that may have been set here
app.get('/set_cookie', function (request, response) {
  console.log('In GET /set_cookie');
  var my_name = 'Noah';
  response.cookie('your_name', my_name).send('cookie set'); //Sets name = express
});

app.get('/use_cookie', function (request, response) {
  console.log('In GET /use_cookie', request.cookies);
  var the_name = request.cookies["your_name"];
  response.send('Welcome to the Use Cookie page' + the_name); //Sets name = express
});

app.get('/use_session', function (request, response) {
  console.log('In GET /use_session', request.session);
  var the_sess_id = request.session.id;
  request.session.destroy();
  response.send('Welcome! Your session ID is ' + the_sess_id); //Sets name = express
  
});

app.post("/process_cart", function (request, response) {
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
      str =`<form id="shopping-cart" action="cart.html" method="post">
      <table class="shopping-cart">
          <thead>
              <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Qty</th>
                  <th scope="col">Price</th>
              </tr>
          </thead>
          <tbody></tbody>
      </table>
      <p id="sub-total">
          <strong>Sub Total</strong>: <span id="stotal"></span>
      </p>
      <ul id="shopping-cart-actions">
          <li>
              <input type="submit" name="update" id="update-cart" class="btn" value="Update Cart" />
          </li>
          <li>
              <input type="submit" name="delete" id="empty-cart" class="btn" value="Empty Cart" />
          </li>
          <li>
              <a href="index.html" class="btn">Continue Shopping</a>
          </li>
          <li>
              <a href="checkout.html" class="btn">Go To Checkout</a>
          </li>
      </ul>
  </form>`;
  response.send(str);
    }
  }});
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
      <form action="/check_login?${qs.stringify(POST)}" method="POST">
      <link rel="stylesheet" href="./login_style.css"></link>
      <h1>Welcome! Please log in.</h1>
      <input type="text" name="username" size="40" placeholder="enter username" ><br />
      <input type="password" name="password" size="40" placeholder="enter password"><br />
      <input type="submit" value="Submit" id="submit">
      </form>
      <h1>If you are a new customer, please register </h1>
      <a href = "./register?${qs.stringify(POST)}"><h1>by clicking on this link</h1></a>
      </body>
          `;
      response.send(str);

      app.post("/check_login", function (request, response) {
        // Process login form POST and redirect to logged in page if ok, back to login page if not
        console.log(request.query);
        var err_str = "";
        var login_username = request.body["username"];
        //Check if username exits in reg data. If so, check if password matches
        errs = ["The username or password you entered is invalid. Please check your credentials and try again."];
        if (typeof userdata[login_username] != 'undefined') {
          var user_info = userdata[login_username];
          // Check if password stored for username matches what user typed in
          if (user_info["password"] != request.body["password"]) {
            err_str = `Wrong password!`;
          } else {
            // Username and password are good. Generate the invoice! 
            respondinvoice(response, request.query, login_username);
            return;
          }

        } else {
          response.end(JSON.stringify(errs));
        }
        response.redirect(`./login?username} = ${login_username} &error = ${err_str}`);
      });
    }
    /* Else deny the request with "Sorry! At least one of your quantities is not valid... */
    else {
      response.send("Sorry! At least one of your quantities is not valid. Please enter a valid quantity and try again!");
    }
  }
});
app.get("/register", function (request, response) {
  // Give a simple register form
  str = `
<body>
<form action="/register_user?${qs.stringify(request.query)}" method="POST">
<link rel="stylesheet" href="./login_style.css"></link>
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
  `;
  response.send(str);

});

app.post("/register_user", function (request, response) {
  // process a simple register form
  console.log(request.body);
  username = request.body.username;
  errs = [];
  //Check if username is taken
  if (typeof userdata[username] != 'undefined') {
    errs.push("Sorry! That username is taken. Please choose a different username.");
  } else {
    userdata[username] = {};
  }
  // Is password same as repeat password 
  if (request["body"]["password"] != request["body"]["repeat_password"]) {
    errs.push("The passwords you entered do not match. Please check your password and try again.");
  } else {
    userdata[username].password = request["body"]["password"];
  }

  userdata[username] = {};
  userdata[username].password = request.body.password;
  userdata[username].email = request.body.email

  if (errs.length == 0) {
    fs.writeFileSync(user_info_file, JSON.stringify(userdata));
    respondinvoice(response, request.query, username);
  } else {
    response.end(JSON.stringify(errs));
  }
});
/* Got from Lab13; tells server to use public file*/
app.use(express.static('./public'));
/*Tells server to run on port8080 */
app.listen(8080, () => console.log(`connected to port 8080`));


function respondinvoice (theresponse, thequantities, theusername) {

  if (typeof thequantities['purchase_submit'] != 'undefined') {
    /*Validates the quantites*/
    var isvalid = true;
    for (i = 0; i < products.length; i++) {
      q = thequantities["quantity" + i];
      isvalid = isvalid && isNonNegInt(q);
    }

    /*If quantities are valid, generate the invoice.*/
    /* Retrieved invoice table layout from Invoice WOD */
    if (isvalid) {

      var htmlstr = `
      <link rel="stylesheet" href="./invoice_style.css"></link>
      <h2>Thank you for your purchase, ${theusername}!</h2>
      <table border="2">
    <tbody><tr>
    <th style="text-align: center;" width="43%">Item</th>
    <th style="text-align: center;" width="11%">quantity</th>
    <th style="text-align: center;" width="13%">price</th>
    <th style="text-align: center;" width="54%">extended price</th>
  </tr>`;
      var extended_price;
      var subtotal = 0;

      for (i = 0; i < products.length; i++) {

        q = thequantities["quantity" + i];
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
      theresponse.send(htmlstr);
    }
    /* Else deny the request with "Sorry! At least one of your quantities is not valid... */
    else {
      theresponse.send("Sorry! At least one of your quantities is not valid. Please enter a valid quantity and try again!");
    }
  }
}