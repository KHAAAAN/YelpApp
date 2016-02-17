import {Component} from 'angular2/core';
import {Demographic} from './demographic';

@Component({
	selector: 'demographic-form',
	templateUrl:'app/demographic-form.component.html',
	styleUrls:['app/demographic-form.component.css'],
	
	inputs: ['demographicModel']

})

export class DemographicFormComponent {
	public demographicModel: Demographic;
}
