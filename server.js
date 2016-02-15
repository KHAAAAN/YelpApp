var express = require("express");
var app = express();
var cors = require('cors');

app.use(cors());

app.get('/', function(req, res, next) {
	next();
	//res.send("Test");
	//res.sendfile(__dirname + "/index.html");
});

app.get('/states.json', function(req, res) {
	
	res.contentType('application/json');	

	var states = { 
		data : [
			{state : "YOLOSWAG", city: "TEST2", zipcode : "1001"},
			{state : "BOSWAGGY", city: "TEST4", zipcode : "1002"}
		] 
	}; 

	var statesJSON = JSON.stringify(states);
	res.send(statesJSON);
});



app.listen(4000, function () {
	console.log('listening on 4000');
});
