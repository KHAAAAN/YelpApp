import {Component, OnInit}	from 'angular2/core';
//import {STATES}		from './states';
//import {NgForm}		from 'angular2/common';
import {Location}	from './location';
import {LocationService} from './location.service';

@Component({
	selector: 'location-form',
	templateUrl:'app/location-form.component.html', styleUrls: ['app/location-form.component.css']
})

export class LocationFormComponent {
		
	public states: string[];
	public cities: string[];
	public submitted = false;
	public locationModel = new Location();
	errorMessage: string;
		
	constructor(private _locationService: LocationService){}
	
	getStates(){
		this._locationService.getStates()
			.subscribe(
				states => this.states = states,
				error => this.errorMessage = <any>error);	
	}

	getCities(){
		this._locationService.getCities()
			.then(
				cities => this.cities = cities,
				error => this.errorMessage = <any> error
				);

	}
	
	ngOnInit() { this.getStates(); }

	public onSubmit() { 
			this.submitted = true; 
	}
}
