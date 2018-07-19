import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Price } from '../models/price';
import { SecurityData } from '../models/security-data';
import { HistoricalPricesService } from '../services/historical-prices.service';

import { Observable }        from 'rxjs/Observable';
import { Chart } from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'br-chart',
  templateUrl: './templates/info.component.html',
  styleUrls: ['./styles/info.component.css']
})
export class InfoComponent implements OnInit {
  private _label: string;
  private _dataset: Price[];

  @Input()
  set label(label: string) {
    this._label = label;
  }

  get label(): string { return this._label; }

  @Input()
  set dataset(dataset: Price[]) {
    this._dataset = dataset;
    if (this.chart) {
      this.clearChart();
      this.applyInputToChart();
    }
  }

  get dataset(): Price[] { return this._dataset; }

  @Input()
  set ticker(t: SecurityData) {
    this._ticker = t;
  }

  @Output() sendSecurities = new EventEmitter<any>();
  @Output() sendAllCalculations = new EventEmitter<any>();

  ctx: HTMLElement;
  chart: Chart;
  datasets = []; //Prices
  labels = []; //X-axis
  options: any = {};
  firstPrice: number[] = []; //The first price in the security
  leagendLabel = []; //Keeps track of all the labels in the graph
  comparisonMode: boolean = false;
  loading: boolean = false;
  inverseLabel = []; //Used to re-order the labels to ease in changing timelines
  inverseDataset = [];
  colors = ['rgb(47, 122, 46)', 'rgb(207, 18, 89)', 'rgb(34, 174, 209)', 'rgb(137, 157, 120)', 'rgb(62, 25, 41)'];
  _ticker: SecurityData;
  calTicker: any;

  firstDate: moment.Moment; // if a filter is in place, this will have a value
  completeLabels: moment.Moment[] = [];
  completeDatasets = []; // must always be in price form

  constructor(private historicalPricesService: HistoricalPricesService) {
    // Chart.defaults.global.legend.onClick = (e, legendItem) => {
    //   this.chart.data.labels.splice(legendItem.datasetIndex, 1);
    //   this.datasets.splice(legendItem.datasetIndex, 1)
    //   this.leagendLabel.splice(legendItem.datasetIndex, 1)
    //   this.updateChart(this.labels, this.datasets);
    // };
    Chart.defaults.global.legend.onHover = (e, legendItem) => {
      this.datasets[legendItem.datasetIndex].lineTension = 1;
      this.updateChart(this.labels, this.datasets);
    }
  }

  public ngOnInit() {
    this.ctx = document.getElementById('chart');
    this.options = {
      responsive: true,
      legend: {
        labels: {
          //fontColor: 'rgb(0,0,0)'
        }
      },
      tooltips: {
        mode: 'point',
        intersect: true,
        callbacks: {
          label: (tooltipItem, data) => {
            let result = this.datasets[tooltipItem.datasetIndex].label + ': ';
            return result + (this.comparisonMode ?
              (tooltipItem.yLabel * 100).toFixed(2) + '%' :
              tooltipItem.yLabel.toFixed(2));
          }
        }
      },
      hover: {
        mode: 'index', //Should be index. BUT the deletion of a graph messes with the meta-data... must fix l8r
        intersect: false
      },
      scales: {
        xAxes: [{
          type: 'time',
          time: {
            unit: 'month',
            tooltipFormat: 'MM/DD/YYYY'
          }
        }],
        yAxes: [{
          display: true,
          ticks: {
            callback: (value, index, values) =>
              this.comparisonMode ?
                (value * 100).toFixed(0) + '%' :
                '$' + value.toFixed(2)
          }
        }]
      }
    };
    if (this.inputReceived()) {
      this.applyInputToChart();
    }

    if (this.getInput()) {
      this.onNotifySelected(this._ticker);
    }
  }

  private getInput(): boolean {
    if (this._ticker) {
      return true;
    }
    return false;
  }

  private inputReceived(): boolean {
    if (this.label && this.dataset) {
      return true;
    }
    return false;
  }

  private applyInputToChart(): void {
    this.addDataset(this.label, this.dataset);
    this.chart.update();
  }

  private clearChart(): void {
    this.datasets = [];
    this.labels = [];
    this.completeLabels = [];
    this.completeDatasets = [];
    this.comparisonMode = false;
    this.firstPrice = [];
    this.chart.destroy();
    this.chart = null;
  }

  private createDataset(name: string, data: number[]): any {
    let i = this.completeDatasets.length;

    if (data[0] === 0) {
      data = this.convertToPrice(data, 1);
    }

    return {
      label: name,
      backgroundColor: this.colors[i],
      borderColor: this.colors[i],
      data: data,
      fill: false,
      borderWidth: .5,
      lineTension: 0,
      pointRadius: 0
    };
  }

  public addDataset(name: string, data: Price[]): void {
    if (this.completeLabels.length === 0) {
      this.completeLabels = data.map(price => moment(price.date));
    }
    this.completeDatasets.push(
      this.createDataset(name, data.map(price => price.close))
    );
    this.applyFilterToDatasets();
    this.updatePortfolioChart();
  }

  private copyArray(source: Array<any>): Array<any> {
    let arr = [];
    source.forEach(x => arr.push(Object.assign({}, x)));
    return arr;
  }

  private applyFilterToDatasets(): void {
    this.datasets = this.copyArray(this.completeDatasets); // avoids shallow copy
    this.firstPrice = [];

    if (!this.firstDate) {
      this.labels = this.copyArray(this.completeLabels);
    } else {
      this.labels = [];
      this.datasets.forEach(dataset => dataset.data = []);

      for (let i = 0; i < this.completeLabels.length; i++) {
        if (this.completeLabels[i] >= this.firstDate) {
          this.labels.push(this.completeLabels[i]);
          for (let j = 0; j < this.datasets.length; j++) {
            this.datasets[j].data.push(this.completeDatasets[j].data[i]);
          }
        }
      }
    }

    this.datasets.forEach(dataset => this.firstPrice.push(dataset.data[0]));
  }

  private datasetAlreadyExists(label: string): boolean {
    for (let i = 0; i < this.datasets.length; i++) {
      if (this.datasets[i].label === label) {
        return true;
      }
    }
    return false;
  }

  public onTickerReceived(ticker: string): void {
    if (!this.datasetAlreadyExists(ticker)) {
      this.loading = true;
      this.historicalPricesService.getHistoricalPrices(ticker)
        .then(hp => this.addDataset(ticker, hp));
    }
  }

  private updatePortfolioChart(): void {
    if (this.chart) {
      if (this.datasets.length > 1) {
        this.switchToComparison();
      }
      this.chart.destroy();
    }

    this.createChart();
    this.loading = false;
  }

  private createChart(): void {
    this.options.scales.xAxes[0].time.unit = this.labels.length > 100 ? 'month' : 'day';
    this.chart = new Chart(this.ctx, {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: this.datasets
      },
      options: this.options
    });
  }

  public updateChart(_labels: any, _dataset: any): void {
    if (this.chart) {
      this.chart.update();
    } else {
      this.chart = new Chart(this.ctx, {
        type: 'line',
        data: {
          labels: _labels,
          datasets: _dataset
        },
        options: this.options
      });
    }
    this.loading = false;
  }

  public switchToComparison(): void {
    this.comparisonMode = true;
    for (let i = 0; i < this.datasets.length; i++) {
      this.datasets[i].data = this.convertToReturn(this.datasets[i].data, this.firstPrice[i]);
    }
  }

  private convertToReturn(prices: number[], firstPrice: number): number[] {
    return prices.map(value => value / firstPrice - 1);
  }

  private convertToPrice(returns: number[], firstPrice: number): number[] {
    return returns.map(value => (value + 1) * firstPrice);
  }

  public onNotifySelected(p: SecurityData): void {
    this.sendSecurities.emit(p);
    this.loading = true;
    this.historicalPricesService.getHistoricalPrices(p.ticker)
      .then(hp => {
        let i = this.datasets.length;
        if (this.labels.length === 0) {
          this.labels = hp.map(price => moment(price.date));
        }
        for (let j = 0; j < this.leagendLabel.length; j++) {
          if (this.leagendLabel[j] === p.ticker) { // Ignore duplicates loop
            this.updateChart(this.labels, this.datasets);
            return;
          }
        }
        this.calTicker = p.ticker;
        this.getCalculations();
        this.datasets.push({
          label: p.ticker,
          backgroundColor: this.colors[i],
          borderColor: this.colors[i],
          data: hp.map(price => price.close.toFixed(2)),
          fill: false,
          borderWidth: .5,
          lineTension: 0,
          pointRadius: 0
        });
        this.firstPrice.push(this.datasets[i].data[0]);
        if (i > 0 && !this.comparisonMode) {
          this.switchToComparison();
        } else if (this.comparisonMode) {
          this.datasets[i].data = this.convertToReturn(this.datasets[i].data, this.firstPrice[i]);
        }
        this.leagendLabel.push(p.ticker);
        this.updateChart(this.labels, this.datasets);
      });
  }

  public getCalculations() {
    this.historicalPricesService.getHistoricalPrices(this.calTicker)
      .then(hp => {
        let max = Math.max.apply(null, hp.map(data => data.close.toFixed(2)));
        let min = Math.min.apply(null, hp.map(data => data.close.toFixed(2)));
        let volume = hp.map(data => data.volume);
        let sum = 0;
        for (let i = 0; i < volume.length; i++) {
          sum += volume[i];
        }
        let avg = sum / volume.length;

        let date = hp.map(x => x.date)
        let close = hp.map(x => x.close.toFixed(2))
        let range = [];
        for (let i = 0; i < date.length; i++) {
          if (date[i] > '2016-01-01') {
            range.push(close[i]);
          }
        }

        let rmin = Math.min.apply(null, range);
        let rmax = Math.max.apply(null, range);

        this.sendAllCalculations.emit({ min, max, avg: avg.toFixed(0), rmin, rmax });
      });
  }

  public convertToFiveDay() {
    let newLabels = [];
    let newDataset = [];
    this.inverseLabel = this.labels.reverse();
    for (let i = 0; i < this.datasets.length; i++) {
      this.inverseDataset = this.datasets[i].data.reverse();
      for (let j = 0; j < 5; j++) {
        //I actually get an obj of 5 items in order from most recent to oldest
        newDataset.push(this.inverseDataset[j]);
      }
    }
    for (let i = 0; i < 5; i++) {
      newLabels.push(this.inverseLabel[i]);
    }
    //this.chart.destroy();
    this.updateChart(newLabels, newDataset);
  }
}
