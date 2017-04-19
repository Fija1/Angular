import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';

import { IMovie } from './movie';

@Injectable()
export class MovieService {
    private _movieUrl = 'http://localhost:8000/api/movies';

    constructor(private _http: Http) { }

    getMovies(): Observable<IMovie[]> {
        return this._http.get(this._movieUrl)
            .map((response: Response) => <IMovie[]> response.json().items)
            .do(data => console.log('All: ' +  JSON.stringify(data)))
            .catch(this.handleError)
    }

    getMovie(id: string): Observable<IMovie> {
        return this.getMovies()
            .map((movies: IMovie[]) => movies.find(p => p._id === id));
    }

    private handleError(error: Response) {
        // in a real world app, we may send the server to some remote logging infrastructure
        // instead of just logging it to the console
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}
