import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'


@Component({
  selector: 'br-about',
  templateUrl: './templates/cart.component.html',
  styleUrls: ['./styles/cart.component.css']

})

export class CartComponent {

  constructor(private pser: PortfoliosService,
              private temp: SecuritiesService) {
    this.test();
  }

  test() {
    this.pser.getPortfolios().then(res => console.log(res));
    this.temp.getSecurities().then(res=> console.log(res));
    this.temp.getSecurityDetails('1').then(res=>console.log(res))
  }
 }
