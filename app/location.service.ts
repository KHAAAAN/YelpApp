import {Injectable} from 'angular2/core';
import {Http, Response, URLSearchParams} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Location} from './location';
import {Demographic} from './demographic';

@Injectable()
export class LocationService {
  constructor (private http: Http) {}

  //private _locationUrl = 'app/states.json';
	private _locationUrl = 'http://localhost:3000/';

  getStates () {
    return this.http.get(this._locationUrl + 'states')
                    .map(res => <string[]> res.json().data)
					          .do(data =>console.log(data)) //eyeball results in the console
                    .catch(this.handleError);
  }

  getCities(state: string){
			let params: URLSearchParams = new URLSearchParams();
			params.set('state', state);
		return this.http.get(this._locationUrl + 'cities', {
			search:params
		})
		.toPromise()
		.then(res => <string[]> res.json().data)
		//.do(data => console.log(data)) //only works with observable
		.catch(this.handleError);
  }

  getZipcodes(state: string, city: string){
	let params: URLSearchParams = new URLSearchParams();
	params.set('state', state);
	params.set('city', city);

		return this.http.get(this._locationUrl + 'zipcodes', {
			search:params
		})
		.toPromise()
		.then(res => <string[]> res.json().data)
		//.do(data => console.log(data))
		.catch(this.handleError);
  }

  getDemographics(zipcode: string){
	let params: URLSearchParams = new URLSearchParams();
	params.set('zipcode', zipcode);

	return this.http.get(this._locationUrl + 'demographics', {
		search:params
	})
	.toPromise()
	.then(res => <Demographic> res.json().data)
	.catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
