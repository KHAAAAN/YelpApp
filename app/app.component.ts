import {Component} from 'angular2/core';
import {LocationFormComponent} from './location-form.component';
import {DemographicFormComponent} from './demographic-form.component';

@Component({
	selector: 'yelp-app',
	
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],
	directives: [LocationFormComponent, DemographicFormComponent]
})

export class AppComponent {
	public title = 'Yelp App';
}
