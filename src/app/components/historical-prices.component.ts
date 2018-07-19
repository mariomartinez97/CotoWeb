import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { HistoricalPricesService } from '../services/historical-prices.service';
import { Sort } from '@angular/material';

import 'rxjs/add/operator/switchMap';

import { Price } from '../models/price';

@Component({
  selector: 'br-price',
  templateUrl: './templates/historical-prices.component.html',
  styleUrls: ['./styles/historical-prices.component.css']
})
export class HistoricalPricesComponent implements OnInit {

  histPrices: Price[];
  closeValue: number[];

	constructor(
    private histPriceService: HistoricalPricesService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.switchMap(
      (params: Params) => this.histPriceService.getHistoricalPrices(params['ticker']))
      .subscribe(prices => {
        this.histPrices = prices;
        this.histPrices.map(data => data.open = Number(data.open.toFixed(2)));
        this.histPrices.map(data => data.close = Number(data.close.toFixed(2)));
        this.histPrices.map(data => data.low = Number(data.low.toFixed(2)));
        this.histPrices.map(data => data.high = Number(data.high.toFixed(2)));
      });
  }

  public sortData(sort: Sort) {
    const data = this.histPrices.slice();
    if (!sort.active || sort.direction == '') {
      this.histPrices = data;
      return;
    }

    function compare(a, b, isAsc) {
      return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
    }

    this.histPrices = data.sort((a, b) => {
      let isAsc = sort.direction == 'asc';
      switch (sort.active) {
        case 'date': return compare(a.date, b.date, isAsc);
        case 'open': return compare(+a.open, +b.open, isAsc);
        case 'close': return compare(+a.close, +b.close, isAsc);
        case 'low': return compare(+a.low, +b.low, isAsc);
        case 'high': return compare(+a.high, +b.high, isAsc);
        case 'volume': return compare(+a.volume, +b.volume, isAsc);
        default: return 0;
      }
    });
  }
}
