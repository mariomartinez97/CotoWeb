import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Price } from '../models/price';

@Injectable()
export class HistoricalPricesService {

  constructor(private http: Http) { }

  getHistoricalPrices(ticker: string): Promise<Price[]> {
    return this.http.get(`${environment.apiUrl}/securities/${ticker}/prices`)
      .toPromise()
      .then(res => res.json() as Price[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
