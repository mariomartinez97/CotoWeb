import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'
import { ReservationService } from '../services/reservation.service'
import { AuthService } from '../services/auth.service'
import { SecurityFilterPipe } from '../pipes/security-filter.pipe';
import { SecurityData } from '../models/security-data';
import { ToursService} from '../services/tours.service'
import { Reservation } from '../models/reservation';
import { TouchSequence } from '../../../node_modules/@types/selenium-webdriver';
import { Tours } from '../models/tours';

@Component({
  selector: 'coto-tour1',
  templateUrl: './templates/tour1.component.html',
  styleUrls: ['./styles/tour1.component.css']

})

export class Tour1Component {

  securities: SecurityData[];
  portfolio: SecurityData[] = [];
  loading: boolean = false;
  selected: boolean = false;
  load: boolean = true;
  query: string;
  Features: any;
  reservation: Reservation[] = [];
  Tour1; Tour2; Tour3; Tour1Price; Tour2Price; Tour3Price;
  resTour: Tours = new Tours;

  constructor(
    private securitiesService: SecuritiesService,
    private router: Router,
    private auth: AuthService,
    private portfolioService: PortfoliosService,
    private toursService: ToursService,
    private res: ReservationService
  ) { }

  addToCart(tourAmount: HTMLInputElement){
    // console.log(tourID);

    // // push selected tour to reservation to retrieve it on cart screen
    // // get the actual reservation
    // //console.log(tourID);
    // console.log(tourID.value);
    // console.log("middle");
    // console.log(tourID.toString());

    let temp2 = {
      "tour": this.resTour,
      "equipment": [],
      "priceTotal": "",
      "uid": ""
  }
    // this.res.getReservation().then(resp=> console.log(resp[0].equipment));
    // console.log('bef')
  this.res.getReservation().then(resp=> {
    console.log('id is:'+ resp[0]._id);
    temp2.equipment = resp[0].equipment;   
    temp2.priceTotal = resp[0].priceTotal;
    temp2.tour = resp[0].tour;
    temp2.uid = resp[0].uid; 
    this.reservation.push({_id: resp[0]._id, tour: resp[0].tour, equipment: resp[0].equipment, uid: resp[0].uid,} as Reservation);
    //console.log(this.reservation[0])
    this.reservation[0].tour[0].amount = tourAmount;
    this.reservation[0].tour[0].tourId = 1
    console.log(this.reservation[0].tour[0].amount);
    // this.reservation.id = temp2.id;
    this.res.deleteReservation(this.reservation[0]._id).then(respDel=>{
      //console.log('respDel' + respDel);
      
      //temp2.tour.tourId = tourID.toString();  
      this.res.createReservation(this.reservation[0]);
    });
    
  });
}

 }
