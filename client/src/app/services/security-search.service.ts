import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { SecurityData } from '../models/security-data';

@Injectable()
export class SecuritySearchService {

  constructor(private http: Http) { }

  search(term: string): Observable<SecurityData[]> {
    return this.http
      .get(`${environment.apiUrl}/securities/?q=${term}`)
      .map(response => response.json() as SecurityData[]);
  }
}
