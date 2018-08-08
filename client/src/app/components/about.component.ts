import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'


@Component({
  selector: 'br-about',
  templateUrl: './templates/about.component.html',
  styleUrls: ['./styles/about.component.css']

})

export class AboutComponent {

  constructor(private pser: PortfoliosService) {
    this.test();
  }

  test() {
    this.pser.getPortfolios().then(res => console.log(res));
    
  }
 }
