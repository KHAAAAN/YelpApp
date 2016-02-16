var express = require("express");
var app = express();
var cors = require('cors');
var mysql = require('mysql2');
var connection = mysql.createConnection({
	user: 'user',
	password: 'pass', 
	//From MySQL command line:
	//CREATE USER 'user'@'localhost' IDENTIFIED BY 'pass';
	//GRANT ALL PRIVILEGES ON * . * TO 'user'@'localhost';

	database: 'Milestone1DB'
});

app.use(cors());

app.get('/', function(req, res, next) {
	next();
	//res.send("Test");
	//res.sendfile(__dirname + "/index.html");
});

app.get('/states', function(req, res) {
	
	console.log("GET request to states has been acknowledged tun tun tunnn\n"); 
	connection.query('SELECT DISTINCT state FROM CensusData ORDER BY state', function(err, rows){
		console.log(rows);
			res.contentType('application/json');	
			
			var stateStrings = [];
			
			for(var i = 0; i < rows.length; i++){
				stateStrings.push(rows[i]["state"]);
			}

			var states = { 
				data : stateStrings
			}; 

			var statesJSON = JSON.stringify(states);
			res.send(statesJSON);
	});

});

app.get('/cities', function(req, res) {
	console.log(req.query);
	var cities = {
		data : ["pris", "work", "seresry"]
	};
	
	var citiesJSON = JSON.stringify(cities);
	res.send(citiesJSON);
});



app.listen(4000, function () {
	console.log('listening on 4000');
});
