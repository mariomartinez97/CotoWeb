import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'


@Component({
  selector: 'br-about',
  templateUrl: './templates/safety-first.component.html',
  styleUrls: ['./styles/about.component.css']

})

export class SafetyFirstComponent {

  constructor(private pser: PortfoliosService,
              private temp: SecuritiesService) {
    
  }
 }
