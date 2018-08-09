import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { SecurityData } from '../models/security-data';
import { FeatureList } from '../models/featurelist'
import { Feature } from '../models/feature';

@Injectable()
export class SecuritiesService {

  constructor(private http: Http) { }

  getSecurities(): Promise<Feature[]> {
    return this.http.get(`${environment.apiUrl}/features`)
      .toPromise()
      .then(res => res.json() as Feature[])
      .catch(this.handleError)
  }


  // getSecurities(): Promise<SecurityData[]> {
  //   return this.http.get(`${environment.apiUrl}/securities`)
  //     .toPromise()
  //     .then(res => res.json() as SecurityData[])
  //     .catch(this.handleError)
  // }

  getSecurityDetails(ticker: string): Promise<SecurityData> {
    return this.http.get(`${environment.apiUrl}/securities/${ticker}`)
      .toPromise()
      .then(res => res.json() as SecurityData)
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
