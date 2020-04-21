var fs = require('fs');
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

