import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'
import { ReservationService } from '../services/reservation.service'


@Component({
  selector: 'br-about',
  templateUrl: './templates/about.component.html',
  styleUrls: ['./styles/about.component.css']

})

export class AboutComponent {

  constructor(private pser: PortfoliosService,
              private temp: ReservationService) {
    this.test();
  }

  test() {
    // this.pser.getPortfolios().then(res => console.log(res));
    // this.temp.getSecurities().then(res=> console.log(res));
    // this.temp.getSecurityDetails('1').then(res=>console.log(res))
    this.temp.getReservation().then(res=> console.log(res));
    console.log('I saved')
  }
 }
