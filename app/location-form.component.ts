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
	public submitted = false;
	public locationModel = new Location();
	public locations: Location[];
	errorMessage: string;
		
	constructor(private _locationService: LocationService){}
	
	getStates(){
		this._locationService.getStates()
			.subscribe(
				locations => this.locations = locations,
				error => this.errorMessage = <any>error);	
	}
	
	ngOnInit() { this.getStates(); }

	public onSubmit() { 
			this.submitted = true; 
	}
}
