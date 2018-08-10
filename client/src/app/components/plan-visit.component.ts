import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'


@Component({
  selector: 'br-about',
  templateUrl: './templates/plan-visit.component.html',
  styleUrls: ['./styles/about.component.css']

})

export class PlanVisitComponent {

  constructor(private pser: PortfoliosService,
              private temp: SecuritiesService) {
    
  }
 }
