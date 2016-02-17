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
	//console.log(req.query);
	var query = 'SELECT zipcode FROM CensusData WHERE city= \'' + req.query["city"] + 
			'\' AND state= \'' + req.query["state"] + '\' ORDER BY zipcode';
	
	//console.log(query);
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
		
		//console.log(zipcodesJSON);
		res.send(zipcodesJSON);
	});	

});

app.get('/demographics', function(req, res) {
	console.log("GET request to demographics has been acknowledged tun tun tunnn\n");
	//console.log(req.query);


	var query = 'SELECT population,avg_income,under18years,18_to_24years,25_to_44years,' +
			'45_to_64years,65_and_over,median_age FROM CensusData WHERE zipcode= \'' +
			req.query["zipcode"] + '\'';

	//console.log(query);
	
	connection.query(query, function(err, rows){
		console.log(rows);
		var textRow = rows[0];
		var demographics = {};

		demographics["population"] = textRow["population"];
		demographics["avg_income"] = parseFloat(textRow["avg_income"]);
		demographics["ageUnder18"] = textRow["under18years"];
		demographics["age18_to_24"] = textRow["18_to_24years"];
		demographics["age25_to_44"] = textRow["25_to_44years"];
		demographics["age45_to_64"] = textRow["45_to_64years"];
		demographics["age65_and_over"] = textRow["65_and_over"];
		demographics["median_age"] = parseFloat(textRow["median_age"]);
		
		console.log(demographics);

		var demographicsData = {
			data: demographics
		};

		var demographicsJSON = JSON.stringify(demographicsData);
		console.log(demographicsJSON);

		res.send(demographicsJSON);
	});
});

app.listen(4000, function () {
	console.log('listening on 4000');
});
