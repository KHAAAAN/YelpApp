import {Component} from 'angular2/core';

import {LocationFormComponent} from './location-form.component';
import {BusinessSearchComponent} from './business-search.component';

import {HTTP_PROVIDERS} from 'angular2/http';
import {LocationService} from './location.service';

import {ROUTER_DIRECTIVES, Router, RouteConfig, ROUTER_PROVIDERS} from 'angular2/router';

@Component({
	selector: 'yelp-app',

	templateUrl: 'app/app.component.html',
	styleUrls: ['app/app.component.css'],
	directives: [ROUTER_DIRECTIVES],
	providers: [HTTP_PROVIDERS, ROUTER_PROVIDERS, LocationService]
})

@RouteConfig([
	{
		path: '/business_demographics', 
		name: 'LocationForm',
		component: LocationFormComponent,
		useAsDefault: true
	},

	{
		path: '/business_search', 
		name: 'BusinessSearch',
		component: BusinessSearchComponent
	}
])

export class AppComponent {
	public isFocused1: boolean = true;
	public isFocused2: boolean = false;

	public color1: string = "#6DB3F2";
	public color2: string = "white";

	public bg1: string = "black";
	public bg2: string = "inherit";

	focus1(){

		//if first is not focused, then focus it
		if(!this.isFocused1){
			this.isFocused1 = true;
			this.color1 = "#6DB3F2";
			this.bg1 = "black";

			this.isFocused2 = false;
			this.color2 = "white";
			this.bg2 = "inherit";
		}
	}

	focus2(){
		if(!this.isFocused2){
			this.isFocused1 = false;
			this.color1 = "white";
			this.bg1 = "inherit";

			this.isFocused2 = true;
			this.color2 = "#6DB3F2";
			this.bg2 = "black";
		}
	}
}
