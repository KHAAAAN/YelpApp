import {Component} from 'angular2/core';
import {STATES} from './states';

@Component({
	selector: 'location-form',
	templateUrl:'app/location-form.component.html'
})

export class LocationFormComponent {
	public states: string[];

	constructor(){ 
		this.states = STATES;
	}
}
