import { Component, OnInit, Output, EventEmitter, AfterViewInit  } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { Portfolio } from '../models/portfolio';
import { PortfolioItem } from '../models/portfolio-item'
import { Sort } from '@angular/material';

import { AuthService } from '../services/auth.service'
import { SecuritiesService } from '../services/securities.service';
import { SecurityFilterPipe } from '../pipes/security-filter.pipe';
import { SecurityData } from '../models/security-data';
import { PortfoliosService } from '../services/portfolios.service';

@Component({
  selector: 'br-securities',
  templateUrl: './templates/tickets.component.html',
  styleUrls: ['./styles/tickets.component.css']
})

export class TicketsComponent implements OnInit, AfterViewInit {

  securities: SecurityData[];
  portfolio: SecurityData[] = [];
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio;
  loading: boolean = false;
  selected: boolean = false;
  load: boolean = true;
  query: string;

  constructor(
    private securitiesService: SecuritiesService,
    private router: Router,
    private auth: AuthService,
    private portfolioService: PortfoliosService
  ) { }

  ngOnInit(): void {
    this.securitiesService.getSecurities()
      .then(securities => {
        this.securities = securities
        this.load = false;
      });
  }

  ngAfterViewInit() {
    if (this.auth.isAuthenticated()) {
      this.loadPortfolios();
    }
  }

  public showHistoricalPrices(security: SecurityData) {
    this.router.navigate(['./prices', security.ticker]);
  }

  public addToPortfolio(selectedTicker: SecurityData) {
    if (!this.selectedPortfolio.items.some(y => y.symbol == selectedTicker.ticker)) {
      this.loading = false;
      this.selectedPortfolio.items.push({
        symbol: selectedTicker.ticker,
        shares: 1,
        details: null
      });
      this.portfolioService.update(this.selectedPortfolio);
    }
    this.router.navigate(['./portfolio']);
  }

  public gotoDetails(security: SecurityData) {
    this.router.navigate(['./security-detail', security.ticker]);
  }

  public isAuthenticated(): boolean {
    return this.auth.isAuthenticated();
  }

  public onChangePortfolio(pName: string): void {
    this.portfolios.forEach(p => {
      if (p.name === pName) {
        this.selectPortfolio(p);
        this.selected = true;
      }
    });
  }

  public selectPortfolio(p: Portfolio): void {
    this.selectedPortfolio = p;
    this.loading = true;

    let numItems = p.items.length;
    p.items.forEach(item => {
      this.securitiesService.getSecurityDetails(item.symbol)
        .then(details => {
          item['details'] = details;
          numItems--;
          if (numItems === 0) {
            //this.loading = false;
          }
        });
    });
  }

  public loadPortfolios(): void {
    let promises: Promise<any>[] = [];

    this.portfolioService.getPortfolios().then(portfolios => {
      if (portfolios.length) {
        portfolios.forEach(p =>
          p.items.forEach(item =>
            promises.push(this.securitiesService.getSecurityDetails(item.symbol)
              .then(details => item.details = details)
            )
          )
        );
      }
      Promise.all(promises).then(() => {
        this.portfolios = portfolios;

        this.selectPortfolio(this.portfolios[0]);
      })
    });

  }

  public getSecurities(): SecurityData[] {
    if (this.query) {
      return this.securities.filter(s => (s.ticker + s.security)
        .toLowerCase().indexOf(this.query.toLowerCase()) > -1);
    }
    return this.securities;
  }

  public sortData(sort: Sort) {
    const data = this.securities.slice();
    if (!sort.active || sort.direction == '') {
      this.securities = data;
      return;
    }

    function compare(a, b, isAsc) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    this.securities = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'ticker': return compare(a.ticker, b.ticker, isAsc);
        case 'securities': return compare(+a.security, +b.security, isAsc);
        default: return 0;
      }
    });
  }

}
