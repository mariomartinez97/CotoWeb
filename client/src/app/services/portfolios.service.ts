import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { Reservation } from '../models/reservation'

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Portfolio } from '../models/portfolio';
import { Cotizaciones } from '../models/cotizaciones';

@Injectable()
export class PortfoliosService {

  private headers = new Headers({'Content-Type': 'application/json'});;

  constructor(private authHttp: AuthHttp) { }

  getPortfolios(): Promise<Cotizaciones[]> {
    return this.authHttp.get(`${environment.apiUrl}/cotizaciones`)
      .toPromise()
      .then(res => res.json() as Cotizaciones[])
      .catch(this.handleError);
  }

  create(portfolio: Portfolio): Promise<Portfolio> {
    let pCopy = JSON.parse(JSON.stringify(portfolio));
    pCopy.items.forEach(i => i.details = undefined);
    return this.authHttp.post(`${environment.apiUrl}/portfolios`, JSON.stringify(portfolio), { headers: this.headers })
      .toPromise()
      .then(id => {
        pCopy.id = id.json();
        return pCopy;
      })
      .catch(this.handleError);
  }

  update(portfolio: Portfolio): Promise<Portfolio> {
    return this.authHttp.put(`${environment.apiUrl}/portfolios`, JSON.stringify(portfolio), { headers: this.headers })
      .toPromise()
      .then(() => portfolio)
      .catch(this.handleError);
  }

  delete(portfolio: Portfolio): Promise<any> {
    return this.authHttp.delete(`${environment.apiUrl}/portfolios/${portfolio.id}`, { headers: this.headers })
      .toPromise()
      .then(() => null)
      .catch(this.handleError);
  }

  // getPortfolioReturns(portfolio: Portfolio): Promise<any> {
  //   return this.authHttp.get(`${environment.apiUrl}/portfolios/${portfolio.id}/returns`, { headers: this.headers })
  //     .toPromise()
  //     .then(res => res.json())
  //     .catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
  }
}
