import { Component, AfterViewChecked } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { ToursService } from '../services/tours.service'
import { Reservation } from '../models/reservation';
import { Tours } from '../models/tours';
import { resolve } from 'url';
import { reject } from '../../../node_modules/@types/q';

declare let paypal: any;

@Component({
  selector: 'br-about',
  templateUrl: './templates/cart.component.html',
  styleUrls: ['./styles/cart.component.css']

})

export class CartComponent {

  reservation: Reservation = new Reservation;
  tourInfo: Tours = new Tours;
  addScript: boolean = false;
  paypalLoad: boolean = true;


  paypalConfig = {
    env:'sandbox',
    client: {
      sandbox:'AZDxjDScFpQtjWTOUtWKbyN_bDt4OgqaF4eYXlewfBP4-8aqX3PiV8e1GWU6liB2CUXlkA59kJXE7M6R',
      production:'<insert production client id>'
    },
    commit: true,
    payment: (data, actions)=>{
      return actions.payment.create({
        payment:{
          transactions:[
            {amount: { total: '0.01', currency: 'USD' }}
          ]
        }
      });
    },
    onAuthorize:(data, actions)=>{
      return actions.payment.excecute().then((paymente)=>{
        //do something after payment
      })
    }
  };

  constructor(private rService: ReservationService,
              private tService: ToursService
  ) {
    this.getReservations();
  }

  getReservations() {
    
    this.rService.getReservation().then(resp=>{
      this.reservation._id= resp[0]._id;
      this.reservation.equipment= resp[0].equipment;
      this.reservation.priceTotal = resp[0].priceTotal;
      this.reservation.tour = resp[0].tour;      
      this.reservation.uid = resp[0].uid;
      this.tService.getToursById(resp[0].tour).then(resp=>{
        console.log(resp);
        this.tourInfo.tourId = resp[0].tourId;
        this.tourInfo.price = resp[0].price;
      });
    });       
  }



  ngAfterViewChecked():void{
    if(!this.addScript){
      this.addPaypalScript().then(()=>{
        paypal.Button.render(this.paypalConfig, '#paypal-checkout-btn');
        this.paypalLoad = false;
      })
    }
  }

  addPaypalScript(){
    this.addScript = true;
    return new Promise((resolve,reject)=>{
      let scripttagelement = document.createElement('script');
      scripttagelement.src = 'https://www.paypalobjects.com/api/checkout.js';
      scripttagelement.onload = resolve;
      document.body.appendChild(scripttagelement);
    })
  }

 }
