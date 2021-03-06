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

declare let $: any;

@Component({
  selector: 'coto-tour1',
  templateUrl: './templates/tour1.component.html',
  styleUrls: ['./styles/tour1.component.css']

})

export class Tour1Component implements OnInit {



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
  
  ngOnInit() {
    // let dt = [6, 21];
    $('#datepicker').datepicker({
      // daysOfWeekHighlighted: "1,2",
      datesDisabled: ['10/06/2018', '10/21/2018']
    });
  }

  addToCart(tourAmount: HTMLInputElement, tourDate: Date) {
    let temp2 = {
      "tour": this.resTour,
      "equipment": [],
      "priceTotal": 0,
      "uid": "",
      "totalTour": 0,
      "totalEquip": 0,
      "date": tourDate
    }

    this.res.getReservation().then(resp => {
      if (resp[0] != null) {
        temp2.uid = resp[0].uid;
        temp2.equipment = resp[0].equipment;
        temp2.tour = resp[0].tour;
        temp2.totalTour = resp[0].totalTour;
        temp2.totalEquip = resp[0].totalEquip;
        temp2.priceTotal = parseInt(resp[0].priceTotal);
        temp2.date = resp[0].date;

        temp2.tour.tourId = "1";
        this.toursService.getToursById(temp2.tour.tourId).then(resp => {
          temp2.tour.price = resp[0].price
          temp2.totalTour = parseInt(temp2.tour.price.toString(), 10)
          temp2.totalTour = temp2.totalTour * temp2.tour.amount;
          temp2.priceTotal = temp2.totalEquip + temp2.totalTour;
        });
        temp2.tour.amount = parseInt(tourAmount.toString(), 10)
        temp2.date = tourDate;

        this.res.deleteReservation(resp[0]._id).then(respDel => {
          this.res.createReservation(temp2);
        });
      }
      else {
        temp2.tour.tourId = "1";
        this.toursService.getToursById(temp2.tour.tourId).then(resp => {
          temp2.tour.price = resp[0].price
          temp2.totalTour = parseInt(temp2.tour.price.toString(), 10)
          temp2.totalTour = temp2.totalTour * temp2.tour.amount;
          temp2.priceTotal = temp2.totalEquip + temp2.totalTour;
          temp2.tour.amount = parseInt(tourAmount.toString(), 10);
          temp2.date = tourDate;
          this.res.createReservation(temp2);
        });

      }
    });
  }

 }
