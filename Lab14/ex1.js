var fs = require('fs');
var user_info_file = './user_data.json';

var data = fs.readFileSync('./user_data.json', 'utf-8');
data = JSON.parse(data);
console.log(data.kazman.password);