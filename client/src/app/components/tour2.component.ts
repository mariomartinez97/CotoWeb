import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'
import { ReservationService } from '../services/reservation.service'
import { Router } from '@angular/router';
import { Tours } from '../models/tours';
import { AuthService } from '../services/auth.service';
import { ToursService} from '../services/tours.service'

declare let $: any;

@Component({
  selector: 'coto-tour2',
  templateUrl: './templates/tour2.component.html',
  styleUrls: ['./styles/tour2.component.css']

})

export class Tour2Component implements OnInit{

  Features: any;
  resTour: Tours = new Tours;
  
  constructor(
    private router: Router,
    private auth: AuthService,
    private portfolioService: PortfoliosService,
    private toursService: ToursService,
    private res: ReservationService
  ) { }

  ngOnInit() {
    // let dt = [6, 21];
    $('#datepicker').datepicker({
      // daysOfWeekHighlighted: "1,2",
      datesDisabled: ['10/06/2018', '10/21/2018']
    });
  }

addToCart(tourAmount: HTMLInputElement){

    let temp2 = {      
      "tour": this.resTour,
      "equipment": [],
      "priceTotal": 0,
      "uid": "",
      "totalTour":0,
      "totalEquip":0
  }

  this.res.getReservation().then(resp=> {
    if(resp[0] != null){
      temp2.uid = resp[0].uid; 
      temp2.equipment = resp[0].equipment;   
      temp2.tour = resp[0].tour;
      temp2.totalTour = resp[0].totalTour;
      temp2.totalEquip = resp[0].totalEquip;
      temp2.priceTotal = parseInt(resp[0].priceTotal);
      
      
      temp2.tour.tourId = "2";
      this.toursService.getToursById(temp2.tour.tourId).then(resp=>{
        temp2.tour.price = resp[0].price;    
        temp2.totalTour = parseInt(temp2.tour.price.toString(),10)
        temp2.totalTour = temp2.totalTour * temp2.tour.amount;
        temp2.priceTotal = temp2.totalEquip + temp2.totalTour; 
      });
      temp2.tour.amount = parseInt(tourAmount.toString(),10) 
      
  
      this.res.deleteReservation(resp[0]._id).then(respDel=>{      
        this.res.createReservation(temp2);
      });      
    }
    else{
      temp2.tour.tourId = "2";
      this.toursService.getToursById(temp2.tour.tourId).then(resp=>{
        temp2.tour.price = resp[0].price;
        temp2.totalTour = parseInt(temp2.tour.price.toString(),10)
        temp2.totalTour = temp2.totalTour * temp2.tour.amount;
        temp2.priceTotal = temp2.totalEquip + temp2.totalTour;  
        temp2.tour.amount = parseInt(tourAmount.toString(),10); 
        
        console.log(temp2);  
        this.res.createReservation(temp2);
      });
    }
  });  
}

 }
