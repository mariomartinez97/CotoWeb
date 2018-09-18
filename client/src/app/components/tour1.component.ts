import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'
import { ReservationService } from '../services/reservation.service'
import { AuthService } from '../services/auth.service';
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



  Features: any;
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

    let temp2 = {      
      "tour": this.resTour,
      "equipment": [],
      "priceTotal": "",
      "uid": ""
  }

  this.res.getReservation().then(resp=> {
    if(resp[0] != null){
    temp2.equipment = resp[0].equipment;   
    temp2.priceTotal = resp[0].priceTotal;
    temp2.tour = resp[0].tour;
    temp2.uid = resp[0].uid; 
    temp2.tour.amount = parseInt(tourAmount.toString(),10) 
    temp2.tour.tourId = "1";
    temp2.tour.price = '25';   
    this.res.deleteReservation(resp[0]._id).then(respDel=>{      
      this.res.createReservation(temp2);
    });    
    }
    else{
      temp2.tour.tourId = "1";
      temp2.tour.amount = parseInt(tourAmount.toString(),10); 
      temp2.tour.price = '25';   
      console.log(temp2);  
      this.res.createReservation(temp2);
    }
  });  
}

 }
