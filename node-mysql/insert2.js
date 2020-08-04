let mysql = require('mysql');
let config = require('./config.js');
let connection = mysql.createConnection(config);

let stmt = `INSERT INTO immigrant(first_name, last_name, birth_date, occupation, income_bracket)
VALUES ?`;
let todos = [
    ['Srimathi', 'Surya', '1979-03-05', 'adult', '$1000-$2000'],
    ['Jayaram', 'Vijayaraghavan', '1981-03-05', 'adult', '$1000-$2000'],
];

// execute the insert statment
connection.query(stmt, [todos], (err, results, fields) => {
    if (err) {
        return console.error(err.message);
    }
    // get inserted id
    console.log('Row inserted:' + results.affectedRows);
});

connection.end();