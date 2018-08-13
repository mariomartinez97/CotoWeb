import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'
import { ReservationService } from '../services/reservation.service';
import { Reservation } from '../models/reservation';
import { User } from '../models/user';

@Component({
  selector: 'br-about',
  templateUrl: './templates/plan-visit.component.html',
  styleUrls: ['./styles/about.component.css']

})

export class PlanVisitComponent {

  constructor(private pser: PortfoliosService,
              private temp: SecuritiesService,
              private res: ReservationService) {
    
  }

  createReservation() {
    //   this.res.createReservation()
    let res = {
        "user": "u1",
        "tour": "t1",
        "equipment": "e1",
        "priceTotal": "$99"
    }

    this.res.createReservation(res)
        .then(a => {
            res;
        })
  }
 }
