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
import { ToursService} from '../services/tours.service'
import { Reservation } from '../models/reservation';
import { ReservationService } from '../services/reservation.service';
import { TouchSequence } from '../../../node_modules/@types/selenium-webdriver';

@Component({
  selector: 'br-securities',
  templateUrl: './templates/tickets.component.html',
  styleUrls: ['./styles/tickets.component.css']
})

//export class TicketsComponent implements OnInit, AfterViewInit {
  export class TicketsComponent  {

  securities: SecurityData[];
  portfolio: SecurityData[] = [];
  portfolios: Portfolio[];
  selectedPortfolio: Portfolio;
  loading: boolean = false;
  selected: boolean = false;
  load: boolean = true;
  query: string;
  Features: any;
  reservation: Reservation[]= [];
  Tour1; Tour2; Tour3; Tour1Price; Tour2Price; Tour3Price;

  constructor(
    private securitiesService: SecuritiesService,
    private router: Router,
    private auth: AuthService,
    private portfolioService: PortfoliosService,
    private toursService: ToursService,
    private res: ReservationService
  ) {
    console.log("im here") 
    console.log(auth.isAuthenticated().toString())
    console.log("im here")
  }

  ngOnInit(): void {
    // this.securitiesService.getSecurities()
    //   .then(securities => {
    //     this.securities = securities
    //     this.load = false;
    //   });

    this.securitiesService.getSecurities().then(res => {
      this.Features = res;
      console.log(this.Features);
    });

    this.toursService.getToursById('1').then(res => {
      this.Tour1 = res[0].features;
      this.Tour1Price = res[0].price;
      console.log(this.Tour1);     
    });

    this.toursService.getToursById('2').then(res => {
      this.Tour2 = res[0].features;
      this.Tour2Price = res[0].price;
      console.log(this.Tour2);
      
    });

    this.toursService.getToursById('3').then(res => {
      this.Tour3 = res[0].features;
      this.Tour3Price = res[0].price;
      console.log(this.Tour3Price);
      
    });    
  }
  addToCart(tourID: HTMLInputElement){
    // push selected tour to reservation to retrieve it on cart screen
    // get the actual reservation
    //console.log(tourID);
    console.log(tourID.value);
    console.log("middle");
    console.log(tourID.toString());

    let temp2 = {
      "id":'',
      "tour": '',
      "equipment": [],
      "priceTotal": "",
      "uid": ""
  }
    let temp = tourID;
    // this.res.getReservation().then(resp=> console.log(resp[0].equipment));
    // console.log('bef')
  this.res.getReservation().then(resp=> {
    console.log('id is:'+ resp[0]._id);
    temp2.equipment = resp[0].equipment;   
    temp2.priceTotal = resp[0].priceTotal;
    temp2.tour = resp[0].tour;
    temp2.uid = resp[0].uid; 
    this.reservation.push({_id: resp[0]._id, tour: temp2.tour, equipment: temp2.equipment, uid: temp2.uid} as Reservation);
    console.log(this.reservation[0])
    // this.reservation.id = temp2.id;
    this.res.deleteReservation(this.reservation[0]);
  //   temp2.tour = tourID.toString();
  //   let nId =  Math.floor(Math.random()*6)+1;
  // temp2._id = nId.toString();
  // this.res.createReservation(temp2)
  //   .then(a => {
  //     temp2;
  //   });    
  });
  // temp2.tour = tourID.toString();  
  // console.log(temp2.tour);
  // console.log("testing this")
  //push 
//  this.securities.push({ ticker: this.detail.ticker, security: this.detail.security, sector: this.detail.sector, industry: this.detail.industry } as SecurityData);

  }
getReservations(): void{
    // public loadPortfolios(): void {
  //   let promises: Promise<any>[] = [];
  let promises: Promise<any>[] = [];
  this.res.getReservation().then(port=>{
    if(port.length){
      port.forEach(p=>
      promises.push())
    }
  })
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


}

  // public createPortfolio(name: HTMLInputElement, parent: HTMLElement): void {
  //     if (!this.portfolios.find(i => i.name === name.value)) {
  //       // console.log(this.portfolios);
  //       this.portfoliosService.create({ name: name.value, items: [] } as Portfolio)
  //         .then(p=>{
  //           //  console.log("aaaaa");
  //             this.loadPortfolios();
  //             this.selectPortfolio(p);
  //             this.comboBoxText = p.name;
  //             // console.log(this.selectedPortfolio);
  //             // console.log(p.name);
  //             // console.log(this.comboBoxText);
  //             //vale = p.name
  //             name.blur();
  //             name.value = null;
  //             parent.classList.remove('is-dirty');
  //         });
  //     }
  //     else {
  //       let counter: number = 1;
  //       while (true) {
  //         let newName: string;
  //         //console.log(counter);
  //         newName = name + "(" + counter + ")";
  //         if (this.portfolios.some(y => y.name == newName)) {
  //           counter++;
  //           //console.log(newName);
  //         }
  //         else {
  //           this.portfoliosService.create({ name: newName, items: [] } as Portfolio)
  //             .then(p=>{
  //                 this.loadPortfolios();
  //                 // this.selectPortfolio(p);
  //                 // this.comboBoxText = p.name;
  
  //                 //vale = p.name
  //             });
  //           break;
  //         }
  //       }
  //     }
  //   }

  // ngAfterViewInit() {
  //   if (this.auth.isAuthenticated()) {
  //     this.loadPortfolios();
  //   }
  // }

  // public showHistoricalPrices(security: SecurityData) {
  //   this.router.navigate(['./prices', security.ticker]);
  // }

  // public addToPortfolio(selectedTicker: SecurityData) {
  //   if (!this.selectedPortfolio.items.some(y => y.symbol == selectedTicker.ticker)) {
  //     this.loading = false;
  //     this.selectedPortfolio.items.push({
  //       symbol: selectedTicker.ticker,
  //       shares: 1,
  //       details: null
  //     });
  //     this.portfolioService.update(this.selectedPortfolio);
  //   }
  //   this.router.navigate(['./portfolio']);
  // }

  // public gotoDetails(security: SecurityData) {
  //   this.router.navigate(['./security-detail', security.ticker]);
  // }

  // public isAuthenticated(): boolean {
  //   return this.auth.isAuthenticated();
  // }

  // public onChangePortfolio(pName: string): void {
  //   this.portfolios.forEach(p => {
  //     if (p.name === pName) {
  //       this.selectPortfolio(p);
  //       this.selected = true;
  //     }
  //   });
  // }

  // public selectPortfolio(p: Portfolio): void {
  //   this.selectedPortfolio = p;
  //   this.loading = true;

  //   let numItems = p.items.length;
  //   p.items.forEach(item => {
  //     this.securitiesService.getSecurityDetails(item.symbol)
  //       .then(details => {
  //         item['details'] = details;
  //         numItems--;
  //         if (numItems === 0) {
  //           //this.loading = false;
  //         }
  //       });
  //   });
  // }

  // public loadPortfolios(): void {
  //   let promises: Promise<any>[] = [];

  //   this.portfolioService.getPortfolios().then(portfolios => {
  //     if (portfolios.length) {
  //       portfolios.forEach(p =>
  //         p.items.forEach(item =>
  //           promises.push(this.securitiesService.getSecurityDetails(item.symbol)
  //             .then(details => item.details = details)
  //           )
  //         )
  //       );
  //     }
  //     Promise.all(promises).then(() => {
  //       this.portfolios = portfolios;

  //       this.selectPortfolio(this.portfolios[0]);
  //     })
  //   });

  // }

  // public getSecurities(): SecurityData[] {
  //   if (this.query) {
  //     return this.securities.filter(s => (s.ticker + s.security)
  //       .toLowerCase().indexOf(this.query.toLowerCase()) > -1);
  //   }
  //   return this.securities;
  // }

  // public sortData(sort: Sort) {
  //   const data = this.securities.slice();
  //   if (!sort.active || sort.direction == '') {
  //     this.securities = data;
  //     return;
  //   }

  //   function compare(a, b, isAsc) {
  //     return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  //   }

  //   this.securities = data.sort((a, b) => {
  //     let isAsc = sort.direction == 'asc';
  //     switch (sort.active) {
  //       case 'ticker': return compare(a.ticker, b.ticker, isAsc);
  //       case 'securities': return compare(+a.security, +b.security, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

}
