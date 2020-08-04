let mysql = require('mysql');
let config = require('./config.js');
let connection = mysql.createConnection(config);

// insert statment
let sql = `INSERT INTO immigrant(first_name, last_name, birth_date, occupation, income_bracket)
           VALUES('Aswin', 'Surya', '2006-03-31', 'student', '$1000-$2000')`;

// execute the insert statment
connection.query(sql);

connection.end();