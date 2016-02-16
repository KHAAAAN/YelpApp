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

connection.config.namedPlaceholders = true;

app.use(cors());

app.get('/', function(req, res, next) {
	next();
	//res.send("Test");
	//res.sendfile(__dirname + "/index.html");
});

app.get('/states', function(req, res) {
	
	console.log("GET request to states has been acknowledged tun tun tunnn\n"); 
	connection.query('SELECT DISTINCT state FROM CensusData ORDER BY state', function(err, rows){
		//console.log(rows);
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

	console.log("GET request to cities has been acknowledged tun tun tunnn\n");
	//console.log(req.query["state"]);	
	var query = 'SELECT DISTINCT city FROM CensusData WHERE state= \'' + req.query["state"] + '\' ORDER BY CITY';
	//console.log(query);
	connection.query(query, function(err, rows){
			var cityStrings = [];
			
			for(var i = 0; i < rows.length; i++){
				cityStrings.push(rows[i]["city"]);
			}

			var cities = {
				data : cityStrings
			};

			var citiesJSON = JSON.stringify(cities);
			
			//console.log(citiesJSON);	

			res.send(citiesJSON);
	});
	
});

app.get('/zipcodes', function(req, res) {
	console.log("GET request to zipcodes has been acknowledged tun tun tunnn\n");
	console.log(req.query);
	var query = 'SELECT zipcode FROM CensusData WHERE city= \'' + req.query["city"] + 
			'\' AND state= \'' + req.query["state"] + '\' ORDER BY zipcode';
	
	console.log(query);
	connection.query(query, function(err, rows){
		var zipcodeStrings = [];
		console.log(rows);
		for(var i = 0; i < rows.length; i++){
			zipcodeStrings.push(rows[i]["zipcode"]);
		}

		var zipcodes = { 
				data : zipcodeStrings
		};

		var zipcodesJSON = JSON.stringify(zipcodes);
		
		console.log(zipcodesJSON);
		res.send(zipcodesJSON);
	});	

});



app.listen(4000, function () {
	console.log('listening on 4000');
});
