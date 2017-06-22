import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Person } from './people.model';

@Injectable()
export class PeopleService {
    
   private actionUrl: string;
   private headers: Headers;
   
   constructor(private _http: Http) {
     this.actionUrl = 'http://eversole.cloud:5000/api/people';

     this.headers = new Headers();
     this.headers.append('Authorization', 'Basic ' + btoa('asdf:asdf'));
   }
  
    public GetAll = (): Observable<Person[]> => {
        return this._http.get(this.actionUrl, { headers: this.headers })
            .map((response: Response) => <Person[]>response.json())
            .catch(this.handleError);
    }

    //public GetAll() {
    //  return this._http.get(`https://eversole.cloud:5000/api/people`)
    //  .map((res:Response) => res.json());
    //}

    private handleError(error: Response) {
        console.error(error);
        return Observable.throw(error.json().error || 'Server error');
    }
}

