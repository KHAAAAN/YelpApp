import {Component}	from 'angular2/core';
import {STATES}		from './states';
//import {NgForm}		from 'angular2/common';
import {Location}	from './location';

@Component({
	selector: 'location-form',
	templateUrl:'app/location-form.component.html',
	styleUrls: ['app/location-form.component.css']
})

export class LocationFormComponent {
		
	public states = STATES;
	public submitted = false;
	public locationModel = new Location();


	public onSubmit() { 
			this.submitted = true; 
	}
}
