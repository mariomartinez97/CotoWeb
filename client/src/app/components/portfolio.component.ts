import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Price } from '../models/price';
import { SecurityData } from '../models/security-data';
import { Portfolio } from '../models/portfolio';
import { PortfolioItem } from '../models/portfolio-item'
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service';

declare let componentHandler: any;

@Component({
  selector: 'br-portfolio',
  templateUrl: './templates/portfolio.component.html',
  styleUrls: ['./styles/portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio;
  portfolioReturns: Price[];
  loading: boolean = false;
  spinner: boolean = true;
  stockChange: boolean = false;
  changePortfolio: boolean = false;
  nameUpdate: boolean = false;
  comboBoxText: string;

  constructor(
    private portfoliosService: PortfoliosService,
    private securitiesService: SecuritiesService,
    private router: Router
  ) { }

  ngOnInit() {
    componentHandler.upgradeDom();
    //this.loadPortfolios();
  }

  // public loadPortfolios(): void {
  //   let promises: Promise<any>[] = [];

  //   this.portfoliosService.getPortfolios().then(portfolios => {
  //     if (portfolios.length) {
  //       portfolios.forEach(p =>
  //         p.items.forEach(item =>
  //           promises.push(this.securitiesService.getSecurityDetails(item.symbol)
  //             .then(details => item.details = details)
  //           )
  //         )
  //       );
  //     }
  //     Promise.all(promises).then(() => {this.portfolios = portfolios
  //     this.spinner = false})
  //   });

  // }


  // public updateName(newName: string): void {
  //   if (!this.portfolios.some(y => y.name == newName)) {
  //     this.selectedPortfolio.name = newName;
  //     this.portfoliosService.update(this.selectedPortfolio);
  //   }
  // }
  // public updateName(newName: HTMLInputElement, parent: HTMLElement){
  //   let p: Portfolio;
  //   //console.log(newName.value);
  //   if (!this.portfolios.find(p=> p.name === newName.value)) {
  //       p = this.portfolios.find(p=>p.name === this.selectedPortfolio.name)
  //       p.name = newName.value;
  //       this.selectedPortfolio.name = newName.value;
  //       this.portfoliosService.update(p);
  //       //sort
  //       this.nameUpdate = false;
  //       newName.blur();
  //       newName.value = null;
  //       parent.classList.remove('is-dirty');
  //   }
  //   else{
  //     //name exists
  //   }
  // }

  // public reloadP(){
  //   this.selectedPortfolio = JSON.parse(JSON.stringify(
  //     this.portfolios.find(p => p.name === this.selectedPortfolio.name)
  //   ));
  //   this.changePortfolio = false;
  // }

  // public onNotifySelected(p: SecurityData): void {
  //   this.stockChange = false;

  //   if (!this.selectedPortfolio.items.some(y => y.symbol == p.ticker)) {
  //     this.changePortfolio = true;
  //     this.securitiesService.getSecurityDetails(p.ticker)
  //       .then(details => this.selectedPortfolio.items.push({
  //         symbol: p.ticker,
  //         shares: 1,
  //         details: details
  //       })
  //       );
  //   }
  // }

  // public selectPortfolio(p: Portfolio): void {
  //   this.selectedPortfolio = JSON.parse(JSON.stringify(p));
  //   this.changePortfolio = false;
  //   this.portfolioReturns = null;

  //   if (p.items && p.items.length) {

  //     this.loading = true;
  //     this.portfoliosService.getPortfolioReturns(p).then(returns => {
  //       this.portfolioReturns = this.getAccruedReturns(returns);
  //     });

  //     let numItems = p.items.length;
  //     p.items.forEach(item => {
  //       this.securitiesService.getSecurityDetails(item.symbol)
  //         .then(details => {
  //           item.details = details;
  //           numItems--;
  //           if (numItems === 0) {
  //             this.loading = false;
  //           }
  //         });
  //     });

  //   }
  // }

  // public createPortfolio(name: HTMLInputElement, parent: HTMLElement): void {
  //   if (!this.portfolios.find(i => i.name === name.value)) {
  //     // console.log(this.portfolios);
  //     this.portfoliosService.create({ name: name.value, items: [] } as Portfolio)
  //       .then(p=>{
  //         //  console.log("aaaaa");
  //           this.loadPortfolios();
  //           this.selectPortfolio(p);
  //           this.comboBoxText = p.name;
  //           // console.log(this.selectedPortfolio);
  //           // console.log(p.name);
  //           // console.log(this.comboBoxText);
  //           //vale = p.name
  //           name.blur();
  //           name.value = null;
  //           parent.classList.remove('is-dirty');
  //       });
  //   }
  //   else {
  //     let counter: number = 1;
  //     while (true) {
  //       let newName: string;
  //       //console.log(counter);
  //       newName = name + "(" + counter + ")";
  //       if (this.portfolios.some(y => y.name == newName)) {
  //         counter++;
  //         //console.log(newName);
  //       }
  //       else {
  //         this.portfoliosService.create({ name: newName, items: [] } as Portfolio)
  //           .then(p=>{
  //               this.loadPortfolios();
  //               // this.selectPortfolio(p);
  //               // this.comboBoxText = p.name;

  //               //vale = p.name
  //           });
  //         break;
  //       }
  //     }
  //   }
  // }

  // public removeStock(stockIndex: number): void {
  //   this.changePortfolio = true;
  //   this.selectedPortfolio.items.splice(stockIndex, 1);
  //   // this.portfoliosService.update(this.selectedPortfolio)
  //   //   .then()
  //   //   .catch();
  // }

  // public save(): void {
  //   if (this.portfolios.find(p=> p.name ==this.selectedPortfolio.name)) {
  //       let n:string;
  //       n = this.selectedPortfolio.name;
  //       this.portfoliosService.update(this.selectedPortfolio)
  //       .then(p=>{
  //         this.loadPortfolios();
  //         this.selectPortfolio(p);
  //         //this.comboBoxText = this.portfolios.find(pn => pn.name === pn.name).name;
  //         //snack bar
  //         this.comboBoxText = n;
  //         // console.log(this.selectedPortfolio);
  //       });
  //   }
  // }

  // public removePortfolio(): void {
  //   this.portfoliosService.delete(this.selectedPortfolio).then(() => {
  //     this.portfolios.splice(
  //       this.portfolios.findIndex(p => p.name === this.selectedPortfolio.name), 1);
  //       this.selectedPortfolio = null;
  //       this.portfolioReturns = null;
  //   });
  //   // this.selectedPortfolio = null;
  //   // this.portfolioReturns = null;
  //   // this.loadPortfolios();
  //   // window.location.reload();
  //   // this.loadPortfolios();


  // }

  // private getAccruedReturns(series: Price[]): Price[] {
  //   for (let i = 1; i < series.length; i++) {
  //     series[i].close = (series[i - 1].close + 1) * (series[i].close + 1) - 1;
  //   }
  //   return series;
  // }

  // private sortPortfolios(): void {
  //   this.portfolios.sort((pA, pB) => (pA.name > pB.name) ? 1 : -1);
  // }

  // public showHistoricalPrices(security: PortfolioItem) {
  //    this.router.navigate(['./security-detail', security.symbol]);
  //  }
}
