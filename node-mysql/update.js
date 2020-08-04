let mysql = require('mysql');
let config = require('./config.js');
let connection = mysql.createConnection(config);

let stmt = `SELECT * FROM immigrant WHERE last_name = 'Surya' AND first_name = 'Srimathi'`;
let row = ``;
// execute the insert statment
connection.query(stmt, (err, results, fields) => {
    if (err) {
        return console.error(err.message);
    }
    // get inserted id
    console.log(results);
    Object.keys(results).forEach(function(key) {
        row = results[key];
        console.log(row.name)
    });
});

let stmt2 = `UPDATE immigrant SET last_name = 'Vijayaraghavan' WHERE id = ` + row;
connection.query(stmt2, (err2, results2, fields2) => {
    if (err2) {
        return console.error(err2.message);
    }
    // get inserted id
    console.log(results2);
});

connection.end();