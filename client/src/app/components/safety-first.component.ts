import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'
import { ToursService } from '../services/tours.service';
import { ReservationService } from '../services/reservation.service';
import { Equipment } from '../models/equipment';

declare let $: any;

@Component({
    selector: 'br-about',
    templateUrl: './templates/safety-first.component.html',
    styleUrls: ['./styles/about.component.css']

})

export class SafetyFirstComponent {
    Equipment: any;
    totalEquipment: number = 0;
    isTotal: Number = 0;
    amt = [];
    price = [];
    equipment: Equipment[] = [];
    singleEquipment: Equipment = {} as Equipment;

    constructor(private pser: PortfoliosService,
        private temp: SecuritiesService,
        private tourService: ToursService,
        private reservationService: ReservationService) {

    }

    ngOnInit(): void {
        this.tourService.getEquipment()
            .then(res => {
                this.Equipment = res;
            });

            
    }

    sendGrandTotal($event, n, a) {
        console.log("TEST")
        // var summ = Number($("#total[0]").text()) + Number($("#total[1]").text());
        //     console.log(summ);
        var td = document.querySelectorAll('#equipmentTbl > tbody > td:last-child');
        //console.log(td);
        
        // var total = [].reduce.call(td, function(a, b) {
        //     console.log(a, b)
        //     return a + parseInt(b.innerText);
        // }, 0);
        var total = 0;
        //console.log(td.length);
        
        for (let i = 0; i < td.length; i++) {
            
            total += parseInt(td[i].textContent.replace('$', ''))
        }
        //total = parseInt(td[0].textContent.replace('$', '')) +  parseInt(td[1].textContent.replace('$', ''));
        // total += parseInt(td[1].innerHTML);
        
        document.getElementById('area_total').innerText = '$'+total;
        this.isTotal = total;

        this.singleEquipment.name = n;
        // console.log(this.singleEquipment);
      
        
        if (this.equipment.length) {
            for (let i = 0; i < this.equipment.length; i++) {
                if (this.equipment[i].name == n) {
                    this.equipment[i].amount = a;
                } else {
                    // nothing
                    this.equipment.push({ name: n, amount: a, price: this.isTotal.toString()} as Equipment);
                }

            }
        } else {
            this.equipment.push({ name: n, amount: a, price: this.isTotal.toString()} as Equipment);

        }
    }

    grandTotal(amt, price) {
        price = parseInt(price, 10);
        this.totalEquipment += amt * price;
        
    }

    addToTour() {
        console.log("Added");
        //onsole.log(this.amt, this.price);
        console.log(this.equipment);
        let temp2 = {
            "tour": '',
            "equipment": [],
            "priceTotal": "",
            "uid": ""
        }

        this.reservationService.getReservation().then(resp=> {
            console.log('id is:'+ resp[0]._id);
            temp2.equipment = resp[0].equipment;   
            temp2.priceTotal = resp[0].priceTotal;
            temp2.tour = resp[0].tour;
            temp2.uid = resp[0].uid; 
            temp2.equipment = this.equipment;
            this.reservationService.deleteReservation(resp[0]._id).then(respDel=>{
                //console.log('respDel' + respDel); 
                // console.log("Temp2",temp2);
                
                this.reservationService.createReservation(temp2);
              });
          });
    }
}
