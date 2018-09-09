import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { ToursService } from '../services/tours.service'
import { Reservation } from '../models/reservation';
import { Tours } from '../models/tours';


@Component({
  selector: 'br-about',
  templateUrl: './templates/cart.component.html',
  styleUrls: ['./styles/cart.component.css']

})

export class CartComponent {

  reservation: Reservation = new Reservation;
  tourInfo: Tours = new Tours;

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
 }
