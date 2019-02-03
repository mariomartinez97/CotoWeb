import { Component, OnInit } from '@angular/core';
import { PortfoliosService } from '../services/portfolios.service';
import { SecuritiesService } from '../services/securities.service'
import { ToursService } from '../services/tours.service';
import { ReservationService } from '../services/reservation.service';
import { Equipment } from '../models/equipment';
import { Tours } from '../models/tours';

declare let $: any;

@Component({
    selector: 'br-about',
    templateUrl: './templates/safety-first.component.html',
    styleUrls: ['./styles/about.component.css']

})

export class SafetyFirstComponent {
    Equipment: any;
    totalEquipment: number = 0;
    isTotal: number = 0;
    amt = [];
    price = [];
    equipment: Equipment[] = [];
    singleEquipment: Equipment = {} as Equipment;
    resTour: Tours = new Tours;
    test:number;

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

        this.reservationService.getReservation().then(res => {
            // console.log(res[0].equipment[0].amount);
            //this.Equipment = res[0].equipment;
        })
            
    }

    sendGrandTotal($event, n, a, t) {
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
            // console.log("Length:", this.equipment.length);
            // this.equipment.forEach(e => {
            //     this.equipment.push({name:n, amount: a, price: this.isTotal.toString() } as Equipment )
            // });
            for (let i = 0; i < this.Equipment.length; i++) {                
                if(this.equipment[i] != null) {
                    // console.log(this.equipment[i].name, "<-")
                    if (this.equipment[i].name == n) {
                        
                        this.equipment[i].amount = a;
                        this.equipment[i].price = t;

                    } else {
                        // nothing                       

                        if(i+1 == this.equipment.length) {
                        this.equipment.push({ name: n, amount: a, price: t} as Equipment);
                    }
                    }
                }
            }
        } else {
            // 1
            this.equipment.push({ name: n, amount: a, price: t} as Equipment);
        }
    }

    grandTotal(amt, price) {
        price = parseInt(price, 10);
        this.totalEquipment += amt * price;
        
    }

    addToTour() {
        let temp2 = {
            "tour": this.resTour,
            "equipment": [],
            "priceTotal": 0,
            "uid": "",
            "totalTour": 0,
            "totalEquip": 0
        }

        this.reservationService.getReservation().then(resp=> {
            // console.log('id is:'+ resp[0]._id);
            temp2.uid = resp[0].uid; 
            temp2.tour = resp[0].tour;
            temp2.equipment = resp[0].equipment;
            
            // console.log(this.isTotal);
            
            temp2.totalTour = resp[0].totalTour;
            temp2.totalEquip = this.isTotal; 
            temp2.priceTotal = temp2.totalTour + temp2.totalEquip;
            temp2.equipment = this.equipment;
            this.reservationService.deleteReservation(resp[0]._id).then(respDel=>{
                //console.log('respDel' + respDel); 
                // console.log("Temp2",temp2);
                
                this.reservationService.createReservation(temp2);
              });
          });
    }
}
