import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Observable} from 'rxjs/Observable';
import {Location} from './location';

@Injectable()
export class LocationService {
  constructor (private http: Http) {}

  //private _locationUrl = 'app/states.json';
	private _locationUrl = 'http://localhost:4000/states';	

  getStates () {
    return this.http.get(this._locationUrl)
                    .map(res => <string[]> res.json().data)
					.do(data =>console.log(data)) //eyeball results in the console
                    .catch(this.handleError);
  }
  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}

