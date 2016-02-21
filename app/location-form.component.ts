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

export class LocationFormComponent {

	public states: string[];
	public cities: string[];
	public zipcodes: string[];
	public demographic: Demographic;

	public locationModel = new Location();

	errorMessage: string;

	constructor(private _locationService: LocationService){}

	resetCityZipcode(){
		this.zipcodes=[];
		this.cities=[];
	}

	setCurrentState(event){
		this.locationModel.state = event["target"]["label"];
	}

	setCurrentCity(event){
		this.locationModel.city = event["target"]["label"];
	}

	setCurrentZipcode(event){
		this.locationModel.zipcode = event["target"]["label"];
	}

	getStates(){
		this._locationService.getStates()
			.subscribe(
				states => this.states = states,
				error => this.errorMessage = <any>error);
	}

	getCities(event){
		this._locationService.getCities(event["target"]["label"])
			.then(
				cities => this.cities = cities,
				error => this.errorMessage = <any> error
				);

	}

	getZipcodes(event){
		this._locationService.getZipcodes(this.locationModel.state, event["target"]["label"])
		.then(
			zipcodes => this.zipcodes = zipcodes,
			error => this.errorMessage = <any> error
		);
	}

	getDemographics(event){
		this._locationService.getDemographics(event["target"]["label"])
		.then(
			demographic => this.demographic = demographic,
			error => this.errorMessage = <any> error
		);
	}

	ngOnInit() { this.getStates(); }

}
