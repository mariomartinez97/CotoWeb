import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Price } from '../models/price';
import { SecurityData } from '../models/security-data';
import { InfoComponent } from './info.component'

import { HistoricalPricesService } from '../services/historical-prices.service';
import { SecuritiesService } from '../services/securities.service';

import { Observable } from 'rxjs/Observable';
import { Chart } from 'chart.js';

@Component({
  selector: 'br-security-detail',
  templateUrl: './templates/security-detail.component.html',
  styleUrls: ['./styles/security-detail.component.css']

})

export class SecurityDetailComponent implements OnInit{
  securities: SecurityData[] = [];
  histPrices: Price[];
  detail: any;
  ticker: any;
  security: any;
  closeValue: number[];
  sendTicker = [];
  allCalc = [];

  constructor(private histPriceService: HistoricalPricesService,
    private route: ActivatedRoute,
    private securitiesService: SecuritiesService
  ) { }

ngOnInit() {
  this.route.params.switchMap(
    (params: Params) => this.securitiesService.getSecurityDetails(params['ticker']))
    .subscribe(data => {
      this.detail = data;
      this.ticker = this.detail.ticker;
      this.securities.push({ ticker: this.detail.ticker, security: this.detail.security, sector: this.detail.sector, industry: this.detail.industry } as SecurityData);
      this.sendTicker.push({ ticker: this.detail.ticker });
      this.security = this.detail.security;
    });
  }

  public onNotifySelected(p: SecurityData): void {
    if(!this.securities.some(x => x.ticker == p.ticker)) {
      this.securities.push({ticker: p.ticker, security: p.security, sector: p.industry, industry: p.industry} as SecurityData);
     }
  }

  public onNotifyAllCalculations(e) {
    this.allCalc.push(e);
  }
}
