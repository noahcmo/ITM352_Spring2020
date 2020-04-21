var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");

var user_info_file = './user_data.json';

if (fs.existsSync(user_info_file)) {
    var file_stats = fs.statSync(user_info_file);

    var data = fs.readFileSync('./user_data.json', 'utf-8');
    data = JSON.parse(data);

    console.log(data.kazman.password);

    console.log(`${user_info_file} has ${file_stats.size} characters`);
}
else {
    console.log("hey!" + user_info_file + "doesn't exist!")
}

app.use(myParser.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    // Give a simple login form
    str = `
<body>
<form action="" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not

});

app.listen(8080, () => console.log(`listening on port 8080`));

