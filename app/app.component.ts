import {Component} from 'angular2/core';
import {LocationFormComponent} from './location-form.component';
import {DemographicFormComponent} from './demographic-form.component';

import {HTTP_PROVIDERS} from 'angular2/http';
import {LocationService} from './location.service';

@Component({
	selector: 'yelp-app',
	
	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],
	directives: [LocationFormComponent, DemographicFormComponent],
	providers: [HTTP_PROVIDERS, LocationService]
})

export class AppComponent {
	public title = 'Yelp App';
}
