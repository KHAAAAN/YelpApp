import {Component, OnInit}	from 'angular2/core';
import {Location}	from './location';
import {LocationService} from './location.service';

import {Demographic} from './demographic';
import {DemographicFormComponent} from './demographic-form.component';

@Component({
	selector: 'location-form',
	templateUrl:'app/location-form.component.html', styleUrls: ['app/location-form.component.css'],
	directives: [DemographicFormComponent]
})

export class LocationFormComponent implements OnInit {

	public states: string[];
	public cities: string[];
	public zipcodes: string[];
	public demographic: Demographic;

	public locationModel = new Location();

	errorMessage: string;

	constructor(private _locationService: LocationService){}

	resetCity(){
		
		this.cities=[];
	}

	resetZipcode(){
		this.zipcodes=[];
	}

	resetDemographic(){
		this.demographic = null;
	}

	setCurrentState(event){
		this.locationModel.state = event["target"]["value"];
	}

	setCurrentCity(event){
		this.locationModel.city = event["target"]["value"];
	}

	setCurrentZipcode(event){
		this.locationModel.zipcode = event["target"]["value"];
	}

	getStates(){
		this._locationService.getStates()
			.subscribe(
				states => this.states = states,
				error => this.errorMessage = <any>error);
	}

	getCities(event){
		this._locationService.getCities(event["target"]["value"])
			.subscribe(
				cities => {
						this.cities = cities;
				},
				error => this.errorMessage = <any> error
				);

	}

	getZipcodes(event){
		this._locationService.getZipcodes(this.locationModel.state, event["target"]["value"])
		.subscribe(
			zipcodes => this.zipcodes = zipcodes,
			error => this.errorMessage = <any> error
		);
	}

	getDemographics(event){
		console.log(event["target"]["value"]);
		this._locationService.getDemographics(event["target"]["value"])
		.subscribe(
			demographic => this.demographic = demographic,
			error => this.errorMessage = <any> error
		);
	}

	ngOnInit() { this.getStates();}

}
