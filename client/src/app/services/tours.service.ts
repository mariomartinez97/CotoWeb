import {environment} from 'environments/environment';
import { Headers, Http } from '@angular/http';
import { Tours } from '../models/tours'
import 'rxjs/add/operator/toPromise';
import { Injectable } from '../../../node_modules/@angular/core';
import { Equipment } from '../models/equipment';
// import { Tour } from '../models/tour';

@Injectable()
export class ToursService{

    constructor(private http: Http){}

    getToursById(tourId: string): Promise<Tours> {
        return this.http.get(`${environment.apiUrl}/tours/${tourId}`)
            .toPromise()
            .then(res => res.json() as Tours)
            .catch(this.handleError);
    }

    getEquipment(): Promise<Equipment> {
        return this.http.get(`${environment.apiUrl}/equipment`)
            .toPromise()
            .then(res => res.json() as Equipment)
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
      }
}