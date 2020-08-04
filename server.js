var express = require('express');
var app = express();
var bodyParser = require('body-parser');
let mysql = require('mysql');
let config = require('./config.js');
let connection = mysql.createConnection(config);


// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static('public'));
app.get('/index.html', function(req, res) {
    res.sendFile(__dirname + "/" + "index.html");
})
app.get('/statue_of_liberty', function(req, res) {
    res.sendFile(__dirname + "/" + "statue_of_liberty.jpg");
})
app.get('/immigration_icon', function(req, res) {
    res.sendFile(__dirname + "/" + "immigration_icon.png");
})
app.post('/process_post', urlencodedParser, function(req, res) {
    // Prepare output in JSON format
    response = {
        first_name: req.body.fname,
        last_name: req.body.lname,
        dob: req.body.dob_year + "-" + req.body.dob_month + "-" +
            req.body.dob_day,
        occupation: req.body.occupation_group,
        origin_country: req.body.origin_country,
        income_bracket: 'NA'
    };
    let stmt = `INSERT INTO immigrant(first_name, last_name, birth_date, occupation, origin_country, income_bracket) VALUES (` +
        `"` + response.first_name + `",` +
        `"` + response.last_name + `",` +
        `"` + response.dob + `",` +
        `"` + response.occupation + `",` +
        `"` + response.origin_country + `",` +
        `"` + response.income_bracket + `");`
    console.log(stmt);
    // execute the insert statment
    connection.query(stmt, (err, results, fields) => {
        if (err) {
            return console.error(err.message);
        }
        // get inserted id
        console.log('Row inserted:' + results.affectedRows);
    });

    connection.end();
    console.log(response);
    res.redirect('/index.html');

})

var server = app.listen(8081, function() {
    var host = server.address().address
    var port = server.address().port

    console.log("App listening at http://%s:%s", host, port)
})