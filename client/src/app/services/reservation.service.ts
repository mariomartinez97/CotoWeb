import { Injectable } from '@angular/core';
import { Headers } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
import { Reservation } from '../models/reservation';

@Injectable()
export class ReservationService {

  private headers = new Headers({'Content-Type': 'application/json'});;

  constructor(private authHttp: AuthHttp) { }

  createReservation(reservation: any): Promise<Reservation> {
      let res = JSON.parse(JSON.stringify(reservation));
      return this.authHttp.post(`${environment.apiUrl}/reservations`, JSON.stringify(reservation), {headers: this.headers})
      .toPromise()
      .then(user => {res.user = user.json();
      return res;
      })
      .catch(this.handleError)
    }

    getReservation(): Promise<Reservation[]> {
        return this.authHttp.get(`${environment.apiUrl}/reservations`)
          .toPromise()
          .then(res =>res.json() as Reservation[])
          .catch(this.handleError);
      }

    deleteReservation(res: Reservation): Promise<any> {
        return this.authHttp.delete(`${environment.apiUrl}/reservations/${res._id}`, { headers: this.headers })
          .toPromise()
          .then(() => null)
          .catch(this.handleError);
      }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    }
}